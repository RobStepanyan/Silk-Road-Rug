from django.views.decorators.csrf import csrf_protect
from . import models, serializers, tokens, functions
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
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
                mail_subject='Silk Road Rug | Password Reset',
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
        serializer = self.get_serializer(request.user, data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except Exception as e:
            return Response({'error': e.detail['non_field_errors'][0]})
        return Response({'msg': 'Your personal info is changed.'})
