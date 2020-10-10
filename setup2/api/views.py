import stripe
import datetime
from . import models
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode
from django.views.decorators.csrf import csrf_protect
from . import models, serializers, tokens, functions
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import TokenError
from django.forms.models import model_to_dict
from collections import OrderedDict
from .variables import sort_by, sizes, styles
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.utils import timezone
from django.http import HttpResponse


class RugViewSet(viewsets.ViewSet):
    """
    ViewSet for listing or retrieving rugs.
    """

    @staticmethod
    def get_rugs(id_, sort_by_=None, quanity=1, ids=None, width=sizes[1]['minMax'], height=sizes[3]['minMax'], styles_=list(range(len(styles)))):
        fields = {
            'name': 'name',
            'price': 'base_price'
        }
        models_ = {
            'rug': models.Rug,
            'rug_images': models.RugImage,
            'rug_variations': models.RugVariation,
        }
        serializers_ = {
            'rug': serializers.RugSerializer,
            'rug_images': serializers.RugImageSerializer,
            'rug_variations': serializers.RugVariationSerializer,
        }
        if sort_by_:
            sort_by_ = int(sort_by_)

        if id_:
            rugs = [model_to_dict(models_['rug'].objects.get(id=id_))]
        elif ids:
            rugs = models_['rug'].objects.filter(id__in=ids).values()
        else:
            field = fields[sort_by[sort_by_].split(' ')[0].lower()]
            order = '' if sort_by_ % 2 == 0 else '-'
            rugs = models_['rug'].objects.filter(style__in=styles_
                                                 ).filter(variations__width_feet__range=width
                                                          ).filter(variations__height_feet__range=height).distinct()
            rugs = list(rugs.order_by(order+field).values())[:int(quanity)]

        data = []
        for rug in rugs:
            new_rug = rug
            for key, val in models_.items():
                if key == 'rug':
                    continue
                new_rug[key] = []
                for x in serializers_[key](val.objects.filter(rug=rug['id']), many=True).data:
                    x = dict(x)
                    if key == 'rug_images':
                        new_rug[key].append(x['image'])
                    elif key == 'rug_variations':
                        new_rug[key].append(x)

            data.append(new_rug)

        return data

    @classmethod
    def list(cls, request):
        ids = request.GET.get('ids', None)
        if ids:
            ids = ids.split(',')
        sort_by = request.GET.get('sort_by', 0)
        quanity = len(ids) if ids else request.GET.get('quanity', 10)
        width = request.GET.get('width', sizes[1]['minMax'])
        if width != sizes[1]['minMax']:
            width = width.split(',')
        height = request.GET.get('height', sizes[3]['minMax'])
        if height != sizes[3]['minMax']:
            height = height.split(',')
        styles_ = request.GET.get('styles', list(range(len(styles))))
        if styles_ != list(range(len(styles))):
            if styles_:
                styles_ = styles_.split(',')
            else:
                styles_ = list(range(len(styles)))

        return Response(cls.get_rugs(None, sort_by, quanity, ids, width, height, styles_))

    @classmethod
    def retrieve(cls, request, pk=None):
        return Response(cls.get_rugs(pk))


class SignUpView(GenericAPIView):
    serializer_class = serializers.SignUpSerializer

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
        except Exception as e:
            return Response({'error': e.detail[0]})

        try:
            # Send email with token
            functions.send_email(
                request=request,
                user=user,
                html_path='api/email_verify.html',
                to_email=user.email,
                mail_subject='Silk Road Rug | Email Verification',
                mail_login='rob1stepanyan@yandex.ru',
                mail_pass='temporary'
            )
        except:
            user.delete()
            return HttpResponse('SMTP Error', status=500)
        # Retun Response msg: Check your email
        return Response({'msg': 'Please check your email for the verification link.'})


class SignUpVerifyView(GenericAPIView):
    def get(self, request):
        uidb64 = request.GET['uidb64']
        token = request.GET['token']

        if not all([uidb64, token]):
            return Response({'is_valid': False})
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user and functions.account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'is_valid': True, 'token': tokens.get_tokens_for_user(user)})
        else:
            return Response({'is_valid': False})


class LogInView(GenericAPIView):
    serializer_class = serializers.LogInSerializer

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data
        except Exception as e:
            return Response({'error': e.detail['non_field_errors'][0]})
        return Response({
            # 'user': serializers.UserSerializer(user, context=self.get_serializer_context()).data,
            'token': tokens.get_tokens_for_user(user)
        })


class LogOutView(GenericAPIView):
    # disabled in urls.py
    serializer_class = serializers.LogOutSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid()
            token = serializer.validated_data
            token.blacklist()
            return Response({
                'msg': 'Logged Out'
            })
        except TokenError:
            return Response({
                'msg': 'Invalid Token'
            })


class ForgotInputEmail(GenericAPIView):
    serializer_class = serializers.ForgotInputEmailSerializer

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data
        except Exception as e:
            return Response({'error': e.detail['non_field_errors'][0]})

        try:
            # Send email with token
            functions.send_email(
                request=request,
                user=user,
                html_path='api/forgot_pass.html',
                to_email=user.email,
                mail_subject='Silk Road Rug | Password Reset Confirmation',
                mail_login='rob1stepanyan@yandex.ru',
                mail_pass='temporary'
            )
        except Exception as e:
            return HttpResponse('SMTP Error', status=500)
        # Retun Response msg: Check your email
        return Response({'msg': 'Please check your email for the verification link.'})


class ForgotInputNewPwd(GenericAPIView):
    serializer_class = serializers.ForgotInputNewPwdSerializer

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        uidb64 = request.data['uidb64']
        token = request.data['token']

        if not all([uidb64, token]):
            return HttpResponse(status=500)
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user and functions.account_activation_token.check_token(user, token):
            user.is_active = True
            serializer = self.get_serializer(user, data=request.data)
            try:
                serializer.is_valid(raise_exception=True)
                user = serializer.save()
            except Exception as e:
                return Response({'error': e.detail['non_field_errors'][0]})
            return Response({'msg': 'Your password is changed. Now you can use your account.'})

        return HttpResponse(status=500)


class UserDetailsView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        user = request.user
        return Response({
            'user': serializers.UserSerializer(user).data,
        })


class UserUpdateView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserUpdateSerializer

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        data = request.data
        data.update({'user': request.user})
        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            m = serializer.save()
        except Exception as e:
            return Response({'error': e.detail['non_field_errors'][0]})
        try:
            # Send email with token
            functions.send_email(
                request=request,
                user=request.user,
                html_path='api/edit_user.html',
                to_email=request.user.email,
                mail_subject='Silk Road Rug | Personal Info Update Confirmation',
                mail_login='rob1stepanyan@yandex.ru',
                mail_pass='temporary',
                custom_params={
                    'midb64': urlsafe_base64_encode(force_bytes(m.id))}
            )
        except:
            return HttpResponse('SMTP Error', status=500)

        return Response({'msg': 'Please check your email for the verification link.'})


class UserUpdateVerifyView(GenericAPIView):
    def get(self, request):
        midb64 = request.GET['midb64']

        if not midb64:
            return Response({'is_valid': False})
        try:
            mid = force_text(urlsafe_base64_decode(midb64))
            m = models.PendingUserPersonalInfoUpdate.objects.get(id=mid)
        except:
            m = None
        if m:
            user = m.user
            user.email = m.email_to
            user.first_name = m.first_name_to
            user.last_name = m.last_name_to
            user.save()
            m.delete()
            return Response({'is_valid': True})
        else:
            return Response({'is_valid': False})


class UserChangePwdView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserChangePwdSerializer

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            m = serializer.save()
        except Exception as e:
            return Response({'error': e.detail[0]})

        try:
            # Send email with token
            functions.send_email(
                request=request,
                user=m.user,
                html_path='api/change_pwd.html',
                to_email=m.user.email,
                mail_subject='Silk Road Rug | Password Change Confirmation',
                mail_login='rob1stepanyan@yandex.ru',
                mail_pass='temporary',
                custom_params={
                    'midb64': urlsafe_base64_encode(force_bytes(m.id))
                }
            )
        except:
            return HttpResponse('SMTP Error', status=500)
        # Retun Response msg: Check your email
        return Response({'msg': 'Please check your email for the verification link.'})


class UserChangePwdVerifyView(GenericAPIView):
    def get(self, request):
        midb64 = request.GET['midb64']

        if not midb64:
            return Response({'is_valid': False})
        try:
            mid = force_text(urlsafe_base64_decode(midb64))
            m = models.PendingUserPwdChange.objects.get(id=mid)
        except:
            m = None
        if m:
            user = m.user
            user.set_password(m.password_to)
            user.save()
            m.delete()
            return Response({'is_valid': True})
        else:
            return Response({'is_valid': False})


class UserAddressAddView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserAddressAddSerializer

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'is_valid': True})
        except Exception as e:
            return Response({'error': str(e)})


class UserAddressesView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserAddressesSerializer

    def get_queryset(self):
        return models.Address.objects.filter(user=self.request.user)

    def get(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class UserAddressDeleteView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        id_ = dict(self.request.data)['id']
        try:
            m = models.Address.objects.get(id=id_, user=self.request.user)
        except:
            return Response({'error': 'Object doesn\'t exists.'})
        m.delete()
        return Response({'is_valid': True, 'msg': 'Object removed.'})


class UserAddressEditView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserAddressEditSerializer

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        id_ = dict(self.request.data)['id']
        try:
            m = models.Address.objects.get(id=id_, user=self.request.user)
        except:
            return Response({'error': 'Object doesn\'t exists.'})

        serializer = self.get_serializer(m, self.request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'is_valid': True, 'msg': 'Object updated.'})


class UserAddressGetView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserAddressesSerializer

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        id_ = dict(self.request.data)['id']

        queryset = models.Address.objects.filter(
            id=id_, user=self.request.user)
        if not queryset.exists():
            return Response({'error': 'Object doesn\'t exists.'})

        serializer = self.get_serializer(queryset[0])
        return Response({'data': serializer.data})


class UserAddressSetPrimaryView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        id_ = dict(self.request.data)['id']
        try:
            m = models.Address.objects.get(id=id_, user=self.request.user)
        except:
            return Response({'error': 'Object doesn\'t exists.'})
        user = m.user
        for x in models.Address.objects.filter(user=user):
            x.is_primary = False
            x.save()
        m.is_primary = True
        m.save()
        return Response({'is_valid': True, 'msg': 'Success'})


class ValidatePhoneNumberView(GenericAPIView):
    serializer_class = serializers.ValidatePhoneNumberSerializer

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        s = self.get_serializer(data=request.data)
        if s.is_valid():
            return Response({'is_valid': True})
        return Response({'is_valid': False})


class CartItemViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CartItemModelSerializer

    @method_decorator(csrf_protect)
    def list(self, request):
        """
        Method: GET
        """
        cart_items = models.CartItem.objects.filter(
            user=self.request.user)
        data = []
        for cart_item in cart_items:
            serializer = serializers.CartItemSerializer()
            try:
                serializer = serializer.save(cart_item=cart_item)
            except Exception as e:
                return Response({'error': str(e)})
            data.append(serializer['data'])
        return Response(data)

    @method_decorator(csrf_protect)
    def create(self, request):
        """
        Method: POST
        Check for duplicate if there's duplicate with ALL details
        """
        data = dict(self.request.data)
        data['selecteds'] = data.get('selecteds', ['GS'])
        wrong_fields = ['rug', 'rug_variation']
        for field in wrong_fields:
            if isinstance(data[field], (list, tuple)):
                data[field] = data[field][0]

        data = {**data, 'user': self.request.user.id}
        del data['selecteds']

        if models.CartItem.objects.filter(rug=data['rug'], rug_variation=data['rug_variation']).exists():
            # Don't edit error (see Rug.js)
            return Response({'error': 'Object already exists.'})
        try:
            serializer = self.serializer_class(
                data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except Exception as e:
            return Response({'error': str(e)})
        return Response({'msg': 'Object created.'})

    @method_decorator(csrf_protect)
    def retrieve(self, request, pk=None):
        """
        Method: GET
        """
        try:
            cart_item = models.CartItem.objects.get(
                user=self.request.user, pk=pk)
        except:
            return Response({'error': 'Object doesn\'t exists.'})
        serializer = serializers.CartItemSerializer()
        serializer = serializer.save(cart_item=cart_item)
        return Response(serializer['data'])

    @method_decorator(csrf_protect)
    def update(self, request, pk=None):
        """
        Method: PUT
        Change Rug Variation and CartItem's Selecteds (All Fields are Required)
        """
        data = dict(self.request.data)
        data['selecteds'] = data.get('selecteds', [])
        wrong_fields = ['rug', 'rug_variation']
        for field in wrong_fields:
            if isinstance(data[field], (list, tuple)):
                data[field] = data[field][0]

        if not pk:
            return Response({'error': 'Invalid object id.'})
        try:
            instance = models.CartItem.objects.get(id=pk)
        except:
            return Response({'error': 'Object doesn\'t exists.'})

        try:
            serializer = self.serializer_class(instance,
                                               data={**data, 'user': self.request.user.id})
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except Exception as e:
            return Response({'error': str(e)})
        return Response({'msg': 'Object updated.'})

    @method_decorator(csrf_protect)
    def partial_update(self, request, pk=None):
        """
        Method: PATCH
        Update Rug Variation or/and CartItem's Selecteds
        """
        data = dict(self.request.data)
        data['selecteds'] = data.get('selecteds', [])
        wrong_fields = ['rug', 'rug_variation']
        for field in wrong_fields:
            if field in data and isinstance(data[field], (list, tuple)):
                data[field] = data[field][0]

        if not pk:
            return Response({'error': 'Invalid object id.'})
        try:
            instance = models.CartItem.objects.get(id=pk)
        except:
            return Response({'error': 'Object doesn\'t exists.'})

        try:
            serializer = self.serializer_class(instance,
                                               data={**data, 'user': self.request.user.id}, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except Exception as e:
            return Response({'error': str(e)})
        return Response({'msg': 'Object updated.'})

    @method_decorator(csrf_protect)
    def destroy(self, request, pk=None):
        """
        Method: DELETE
        """
        try:
            cart_item = models.CartItem.objects.get(
                user=self.request.user, pk=pk)
        except:
            return Response({'error': 'Object doesn\'t exists.'})
        cart_item.delete()
        return Response({'msg': 'Object removed.'})


stripe.api_key = 'sk_test_51HW4GfCi0RkzIpI9eYv2ygd9WZTkknqKO0DCG3HXepw2JPzaaT4mmGld6bRXM1mrbTYne9VkZfEtTYBqdsZGvjl600YvArGqDC'


class CreateCheckotSession(GenericAPIView):
    permission_classes = [IsAuthenticated]
    DOMAIN_NAME = 'http://localhost:8000/'

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        line_items = []
        order_totals = {}
        for cart_item in models.CartItem.objects.filter(user=request.user.id):
            # Calculate Rug Price
            rug_var = cart_item.rug_variation
            s = rug_var.price_usd_after_sale if rug_var.price_usd_after_sale else rug_var.price_usd
            # Calculate Additional Costs
            rug = cart_item.rug
            for sel in cart_item.selecteds:
                s += model_to_dict(rug)[sel]
            order_totals[cart_item.id] = s*cart_item.quantity

            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'unit_amount_decimal': int(s * 100),
                    'product_data': {
                        'name': rug.name.title(),
                        'images': [self.DOMAIN_NAME + str(x.image) for x in models.RugImage.objects.filter(rug=rug)]
                    }
                },
                'quantity': cart_item.quantity
            })

        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],

                line_items=line_items,

                mode='payment',
                success_url=self.DOMAIN_NAME +
                'checkout/success/{CHECKOUT_SESSION_ID}',
                cancel_url=self.DOMAIN_NAME + 'checkout/cancel',
            )

        except Exception as e:
            return Response({'error': str(e)})

        orders = []
        now = timezone.now()
        for cart_item in models.CartItem.objects.filter(user=request.user.id):
            total = order_totals[cart_item.id]
            cart_item = model_to_dict(cart_item)
            del cart_item['id']
            del cart_item['user']
            fields_to_update = {'rug': models.Rug,
                                'rug_variation': models.RugVariation}
            for key, val in fields_to_update.items():
                cart_item[key] = val.objects.get(id=cart_item[key])

            order = models.Order(
                **cart_item,
                ordered_at=now,
                user=request.user,
                payment_status='unpaid',
                forecasted_arrival=timezone.now(
                ) + datetime.timedelta(days=(7 if 'GS' in cart_item['selecteds'] else 2)),
                delivery_address=models.Address.objects.get(
                    user=request.user.id, is_primary=True),
                total=total
            )
            order.save()
            orders.append(order.id)

        m = models.CheckoutSession(
            stripe_checkout_sess_id=checkout_session.id,
            user=request.user,
            order_models=orders,
        )
        m.save()

        return Response({'id': checkout_session.id})


class CheckCheckoutSession(GenericAPIView):
    permission_classes = [IsAuthenticated]

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        checkout_id = request.data['checkout_id']

        if not checkout_id:
            return Response({'error': 'No checkout_id provided'})

        try:
            stripe.checkout.Session.retrieve(checkout_id)  # session =
        except Exception as e:
            return Response({'error': str(e)})

        user = models.CheckoutSession.objects.get(
            stripe_checkout_sess_id=checkout_id).user

        models.CartItem.objects.filter(user=request.user.id).delete()
        for order_model_id in models.CheckoutSession.objects.get(stripe_checkout_sess_id=checkout_id).order_models:
            m = models.Order.objects.get(id=order_model_id)
            m.payment_status = 'paid'
            m.save()

        models.CheckoutSession.objects.filter(
            stripe_checkout_sess_id=checkout_id).delete()

        return Response({'first_name': user.first_name})


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.OrderModelSerializer

    @method_decorator(csrf_protect)
    def list(self, request):
        # Method: GET
        queryset = models.Order.objects.filter(user=request.user)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
