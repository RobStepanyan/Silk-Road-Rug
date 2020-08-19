from rest_framework import serializers
from . import models


class RugSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Rug
        fields = '__all__'


class RugImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RugImage
        fields = '__all__'


class RugVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RugVariation
        fields = '__all__'
