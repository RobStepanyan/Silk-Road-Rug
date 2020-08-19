from django.db import models
from .variables import styles

STYLES = [(styles.index(x), x) for x in styles]


class Rug(models.Model):
    name = models.CharField(verbose_name="Rug's Name", max_length=256)
    style = models.IntegerField(
        verbose_name="Style (e.g. Moroccan)", choices=STYLES)
    desc = models.TextField(verbose_name='Description', blank=True, null=True)
    sku = models.CharField(verbose_name='SKU', max_length=255)

    def __str__(self):
        return self.name


class RugImage(models.Model):
    # related_name (images = Rug(...).images)
    rug = models.ForeignKey(
        Rug, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='rugs')

    def __str__(self):
        return ''


class RugVariation(models.Model):
    # related_name (images = Rug(...).images)
    rug = models.ForeignKey(
        Rug, on_delete=models.CASCADE)
    width_feet = models.IntegerField(verbose_name="Width Feet X'")
    width_inch = models.IntegerField(
        verbose_name="Width Inch X\"", blank=True, null=True)
    height_feet = models.IntegerField(verbose_name="Height Feet X'")
    height_inch = models.IntegerField(
        verbose_name="Height Inch X\"", blank=True, null=True)
    price_usd = models.DecimalField(
        verbose_name="Price (USD)", max_digits=12, decimal_places=2, default=0)
    price_usd_after_sale = models.DecimalField(
        verbose_name="Price (USD) After Sale", max_digits=12, decimal_places=2, blank=True, null=True)
    quanity = models.IntegerField(
        verbose_name='Quanity (Available)', default=1)
    is_sample = models.BooleanField(
        verbose_name="Is Sample", default=False)

    def __str__(self):
        return ''
