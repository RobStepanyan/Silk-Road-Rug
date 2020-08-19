from . import models, serializers
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from django.forms.models import model_to_dict
from collections import OrderedDict


class RugViewSet(viewsets.ViewSet):
    """
    ViewSet for listing or retrieving rugs.
    """

    def list(self, request):
        querysets = {
            'rug': models.Rug.objects.all(),
            'rug_images': models.RugImage.objects.all(),
            'rug_variations': models.RugVariation.objects.all(),
        }
        serializers_ = {
            'rug': serializers.RugSerializer,
            'rug_images': serializers.RugImageSerializer,
            'rug_variations': serializers.RugVariationSerializer,
        }
        data = {}
        for key in querysets:
            data[key] = list(serializers_[key](querysets[key], many=True).data)
            data[key] = [dict(dct) for dct in data[key]]

        data_final = []
        for rug in data['rug']:
            image_srcs = []
            for image in data['rug_images']:
                if image['rug'] == rug['id']:
                    image_srcs.append(image['image'])
            rug['images'] = image_srcs

            variations = []
            for variation in data['rug_variations']:
                if variation['rug'] == rug['id']:
                    variations.append(variation)

            rug['variations'] = variations
            data_final.append(OrderedDict(rug))

        return Response(data_final)

    def retrieve(self, request, pk=None):
        queryset = models.Rug.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = serializers.RugSerializer(user)
        return Response(serializer.data)
