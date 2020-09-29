from django.db.models.signals import post_save
from django.forms.models import model_to_dict
from django.dispatch import receiver
from . import models
from .variables import styles


@receiver(post_save, sender=models.RugVariation)
def rug_post_save_receiver(sender, instance, *args, **kwargs):

    prices = []
    prices_before_sale = []
    prices_after_sale = []
    for x in models.RugVariation.objects.filter(rug=instance.rug.id):
        if x.is_sample:
            continue

        if x.price_usd_after_sale:
            prices.append(x.price_usd_after_sale)
        else:
            prices.append(x.price_usd)

        prices_before_sale.append(x.price_usd)
        if x.price_usd_after_sale:
            prices_after_sale.append(x.price_usd_after_sale)

    if not len(prices):
        return
    base_price = sorted(prices)[0]
    base_price_before_sale = sorted(prices_before_sale)[
        0] if any(prices_before_sale) else None
    base_price_after_sale = sorted(prices_after_sale)[
        0] if any(prices_after_sale) else None

    m = models.Rug.objects.get(id=model_to_dict(instance)['rug'])
    m.base_price = base_price
    m.base_price_before_sale = base_price_before_sale
    m.base_price_after_sale = base_price_after_sale
    m.save()
