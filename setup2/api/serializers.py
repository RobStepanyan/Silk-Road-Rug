from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        if User.objects.filter(username=validated_data['email']).exists():
            raise serializers.ValidationError(
                'Account with that email already exists.')

        user = User.objects.create_user(
            is_active=False,
            username=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class LogInSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        data = dict(data)
        user = authenticate(username=data['email'], password=data['password'])
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials')


class LogOutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, data):
        refresh = RefreshToken(dict(data)['refresh'])
        return refresh


class ForgotInputEmailSerializer(serializers.Serializer):
    email = serializers.CharField()

    def validate(self, data):
        data = dict(data)
        try:
            user = User.objects.get(username=data['email'])
            return user
        except Exception:
            raise serializers.ValidationError(
                'An account with the provided email doesn\'t exist.')


class ForgotInputNewPwdSerializer(serializers.Serializer):
    password = serializers.CharField()

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        return instance


class UserUpdateSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    def create(self, validated_data):
        m = models.PendingUserPersonalInfoUpdate(user=self.context['request'].user,
                                                 email_to=validated_data['email'],
                                                 first_name_to=validated_data['first_name'],
                                                 last_name_to=validated_data['last_name'],
                                                 )
        m.save()
        return m
