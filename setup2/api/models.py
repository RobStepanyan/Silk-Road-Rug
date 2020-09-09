from django.db import models
from .variables import styles
from django.contrib.auth.models import User

STYLES = [(styles.index(x), x) for x in styles]


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

    def __str__(self):
        return self.name if self.name else ''


class RugImage(models.Model):
    rug = models.ForeignKey(Rug, on_delete=models.CASCADE,
                            related_query_name='image')
    image = models.ImageField(upload_to='rugs')

    def __str__(self):
        return ''


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
    quanity = models.IntegerField(
        verbose_name='Quanity (Available)*', default=1)
    is_sample = models.BooleanField(
        verbose_name="Is Sample", default=False)

    def __str__(self):
        return ''

    class Meta:
        ordering = ['rug', 'width_feet']


class PendingUserPersonalInfoUpdate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email_to = models.EmailField()
    first_name_to = models.CharField(max_length=255)
    last_name_to = models.CharField(max_length=255)


class PendingUserPwdChange(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    password_to = models.CharField(max_length=255)
