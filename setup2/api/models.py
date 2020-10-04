from django.contrib.postgres.fields import ArrayField
from django.db import models
from . import variables
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField


STYLES = [(variables.styles.index(x), x) for x in variables.styles]


class Rug(models.Model):
    name = models.CharField(verbose_name="Name*", max_length=256)
    base_price = models.DecimalField(
        verbose_name="(LEAVE EMPTY)",
        max_digits=12, decimal_places=2, default=0,
        blank=True, null=True)
    base_price_before_sale = models.DecimalField(
        verbose_name="(LEAVE EMPTY)",
        max_digits=12, decimal_places=2, default=0,
        blank=True, null=True)
    base_price_after_sale = models.DecimalField(
        verbose_name="(LEAVE EMPTY)",
        max_digits=12, decimal_places=2, default=0,
        blank=True, null=True)
    style = models.IntegerField(
        verbose_name="Style*", choices=STYLES)
    desc = models.TextField(
        verbose_name='Description', blank=True, null=True)
    sku = models.CharField(verbose_name='SKU*', max_length=255)
    WC = models.IntegerField(
        verbose_name='Will-Call Pick Up (price)', default=0)
    GS = models.IntegerField(
        verbose_name='Ground Shipping (price)', default=100)
    IN = models.IntegerField(
        verbose_name='Insurance (price)', default=75)
    ES = models.IntegerField(
        verbose_name='Expedited Shipping (price)', default=150)
    SR = models.IntegerField(
        verbose_name='Signature Release Required (price)', default=0)
    WG = models.IntegerField(
        verbose_name='White Glove Delivery (price)', default=50)

    def __str__(self):
        return self.name if self.name else ''


class RugImage(models.Model):
    rug = models.ForeignKey(Rug, on_delete=models.CASCADE,
                            related_query_name='image')
    image = models.ImageField(upload_to='rugs')

    def __str__(self):
        return self.rug.name + ' \'s Image'


class RugVariation(models.Model):
    rug = models.ForeignKey(Rug, on_delete=models.CASCADE,
                            related_query_name='variations')
    width_feet = models.IntegerField(verbose_name="Width Feet X'*")
    width_inch = models.IntegerField(
        verbose_name="Width Inch X\"", blank=True, null=True)
    height_feet = models.IntegerField(verbose_name="Height Feet X'*")
    height_inch = models.IntegerField(
        verbose_name="Height Inch X\"", blank=True, null=True)
    price_usd = models.DecimalField(
        verbose_name="Price (USD)*", max_digits=12, decimal_places=2, default=0)
    price_usd_after_sale = models.DecimalField(
        verbose_name="Price (USD) After Sale", max_digits=12, decimal_places=2, blank=True, null=True)
    quantity = models.IntegerField(
        verbose_name='Quanity (Available)*', default=1)
    is_sample = models.BooleanField(
        verbose_name="Is Sample", default=False)

    def __str__(self):
        return self.rug.name + ' Variation'

    class Meta:
        ordering = ['rug', 'width_feet']


class CartItem(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_query_name='cart_items')
    rug = models.ForeignKey(Rug, on_delete=models.CASCADE)
    rug_variation = models.ForeignKey(RugVariation, on_delete=models.CASCADE)

    def default_selecteds():
        return ['WC']

    selecteds = ArrayField(
        models.CharField(
            max_length=2, choices=variables.ADDITIONAL_SERVICES + variables.SHIPPING_METHODS,
        ),
        size=len(variables.ADDITIONAL_SERVICES) +
        len(variables.SHIPPING_METHODS),
        default=default_selecteds
    )
    quantity = models.IntegerField(default=1)


class PendingUserPersonalInfoUpdate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email_to = models.EmailField()
    first_name_to = models.CharField(max_length=255)
    last_name_to = models.CharField(max_length=255)


class PendingUserPwdChange(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    password_to = models.CharField(max_length=255)


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    country = models.CharField(max_length=2, choices=variables.COUNTRIES)
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state_province_region = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=10)
    phone_number = PhoneNumberField()
    delivery_instructions = models.TextField(
        null=True, blank=True, default=None)
    is_primary = models.BooleanField(default=False)

    class Meta:
        ordering = ('-is_primary',)
