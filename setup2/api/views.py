from . import models, serializers
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from django.forms.models import model_to_dict
from collections import OrderedDict
from .variables import sort_by


class RugViewSet(viewsets.ViewSet):
    """
    ViewSet for listing or retrieving rugs.
    """

    def get_rugs(id_, sort_by_=None, quanity=1):
        fields = {
            'name': 'name',
            'price': 'price_usd'
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

        if id_:
            rugs = [model_to_dict(models_['rug'].objects.get(id=id_))]
        else:
            field = fields[sort_by[sort_by_].split(' ')[0].lower()]
            order = '' if sort_by_ % 2 == 0 else '-'
            rugs = list(
                models_['rug'].objects.order_by(order+field).values()
            )[:int(quanity)]

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

    def list(self, request):
        sort_by = request.GET.get('sort_by', 0)
        quanity = request.GET.get('quanity', 1)

        return Response(self.__class__.get_rugs(None, sort_by, quanity))

    def retrieve(self, request, pk=None):
        return Response(self.__class__.get_rugs(pk))
