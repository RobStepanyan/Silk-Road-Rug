from . import models, serializers, tokens
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from django.forms.models import model_to_dict
from collections import OrderedDict
from .variables import sort_by, sizes, styles


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


class UserSignUpView(GenericAPIView):
    serializer_class = serializers.SignUpSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            'user': serializers.UserSerializer(user, context=self.get_serializer_context()).data,
            'token': tokens.get_tokens_for_user(user)
        })
