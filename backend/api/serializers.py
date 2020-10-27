from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from . import models
from .variables import supported_files
from phonenumber_field.serializerfields import PhoneNumberField
from phonenumber_field.validators import validate_international_phonenumber


class RugImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RugImage
        exclude = ('rug', 'id')


class RugVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RugVariation
        exclude = ('rug',)


class RugSerializer(serializers.ModelSerializer):
    groups = serializers.ListField()
    images = RugImageSerializer(many=True)
    variations = serializers.SerializerMethodField('get_variations')

    def get_variations(self, rug):
        qs = models.RugVariation.objects.filter(quantity__gt=0, rug=rug)
        serializer = RugVariationSerializer(instance=qs, many=True)
        return serializer.data

    class Meta:
        model = models.Rug
        fields = '__all__'


class RugSerializerLite(serializers.ModelSerializer):
    # Used in list()
    images = RugImageSerializer(many=True)

    class Meta:
        model = models.Rug
        fields = ('id', 'name', 'base_price_before_sale',
                  'base_price_after_sale', 'images', 'group_by_age', 'group_by_type')


class RugGroupSerializer(serializers.ModelSerializer):
    tree = serializers.ListField()
    children = serializers.ListField()

    class Meta:
        model = models.RugGroup
        exclude = ('parent_group', 'type', 'image')


class RugGroupSerializerLite(serializers.ModelSerializer):
    # Used for list()
    class Meta:
        model = models.RugGroup
        exclude = ('description', 'parent_group', 'type')


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
        m = models.PendingUserPersonalInfoUpdate(
            user=self.context['request'].user,
            email_to=validated_data['email'],
            first_name_to=validated_data['first_name'],
            last_name_to=validated_data['last_name'],
        )
        m.save()
        return m


class UserChangePwdSerializer(serializers.Serializer):
    new_password = serializers.CharField()

    def create(self, validated_data):
        m = models.PendingUserPwdChange(
            user=self.context['request'].user,
            password_to=validated_data['new_password'],
        )
        m.save()
        return m


class UserAddressAddSerializer(serializers.Serializer):
    full_name = serializers.CharField()
    country = serializers.CharField()
    address_line_1 = serializers.CharField()
    address_line_2 = serializers.CharField(required=False, allow_blank=True)
    city = serializers.CharField()
    state_province_region = serializers.CharField()
    zip_code = serializers.CharField()
    phone_number = PhoneNumberField()
    delivery_instructions = serializers.CharField(
        allow_blank=True, required=False, style={'type': 'textarea'})

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data.update({'user': user, 'is_primary': True})
        for m in models.Address.objects.filter(user=user):
            m.is_primary = False
            m.save()
        m = models.Address(**validated_data)
        m.save()
        return m


class UserAddressEditSerializer(serializers.Serializer):
    full_name = serializers.CharField()
    country = serializers.CharField()
    address_line_1 = serializers.CharField()
    address_line_2 = serializers.CharField()
    city = serializers.CharField()
    state_province_region = serializers.CharField()
    zip_code = serializers.CharField()
    phone_number = PhoneNumberField()
    delivery_instructions = serializers.CharField(
        allow_blank=True, required=False, style={'type': 'textarea'}, default='')

    def update(self, instance, validated_data):
        instance.full_name = validated_data['full_name']
        instance.country = validated_data['country']
        instance.address_line_1 = validated_data['address_line_1']
        instance.address_line_2 = validated_data['address_line_2']
        instance.city = validated_data['city']
        instance.state_province_region = validated_data['state_province_region']
        instance.zip_code = validated_data['zip_code']
        instance.phone_number = validated_data['phone_number']
        instance.delivery_instructions = validated_data['delivery_instructions']
        instance.save()
        return instance


class UserAddressesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Address
        exclude = ('user',)


class ValidatePhoneNumberSerializer(serializers.Serializer):
    number = serializers.CharField()

    def validate(self, data):
        number = dict(data)['number']
        validate_international_phonenumber(number)
        return number


class CartItemSerializer(serializers.Serializer):
    def save(self, cart_item):
        rug = models.Rug.objects.get(id=cart_item.rug.id)
        rug = RugSerializer(rug).data
        rug_variation = models.RugVariation.objects.get(
            id=cart_item.rug_variation.id)
        rug_variation = RugVariationSerializer(rug_variation).data
        rug_image = models.RugImage.objects.filter(rug=cart_item.rug.id)
        if rug_image.exists():
            rug_image = RugImageSerializer(rug_image[0]).data

        return {
            'data': {
                **dict(rug),
                **dict(rug_variation),
                **dict(rug_image),
                'id': cart_item.id,
                'rug_id': dict(rug)['id'],
                'selecteds': cart_item.selecteds,
                'quantitySelected': cart_item.quantity,
            }
        }


class CartItemModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CartItem
        fields = '__all__'


class OrderModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        exclude = ('user',)
        depth = 1

    rug = RugSerializer()


class ContactUsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ContactUs
        exclude = ('status',)

    def file_size(value):
        limit = 25 * 1024 * 1024
        if value.size > limit:
            raise ValidationError(
                'File too large. Size should not exceed 25 MiB.')

    file = serializers.FileField(
        required=False,
        validators=[file_size, FileExtensionValidator(allowed_extensions=supported_files)])
