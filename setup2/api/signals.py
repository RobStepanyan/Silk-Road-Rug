from django.db.models.signals import post_save
from django.forms.models import model_to_dict
from django.dispatch import receiver
from . import models
from .variables import styles


@receiver(post_save, sender=models.RugVariation)
def rug_post_save_receiver(sender, instance, *args, **kwargs):

    prices = []
    for x in models.RugVariation.objects.filter(rug=instance.rug.id):
        if x.is_sample:
            continue
        prices.append(x)

    if not len(prices):
        return
    price = sorted(
        prices, key=lambda x: x.price_usd_after_sale if x.price_usd_after_sale else x.price_usd)[0]
    base_price = price.price_usd_after_sale if price.price_usd_after_sale else price.price_usd
    base_price_before_sale = price.price_usd
    base_price_after_sale = price.price_usd_after_sale

    m = models.Rug.objects.get(id=model_to_dict(instance)['rug'])
    m.base_price = base_price
    m.base_price_before_sale = base_price_before_sale
    m.base_price_after_sale = base_price_after_sale
    m.save()
