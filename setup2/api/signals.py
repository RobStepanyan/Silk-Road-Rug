from django.db.models.signals import post_save
from django.forms.models import model_to_dict
from django.dispatch import receiver
from . import models
from .variables import styles


@receiver(post_save, sender=models.RugVariation)
def rug_post_save_receiver(sender, instance, *args, **kwargs):

    prices = []
    for x in models.RugVariation.objects.filter(rug=model_to_dict(instance)['rug']):
        if x.is_sample:
            continue
        if x.price_usd_after_sale:
            prices.append(x.price_usd_after_sale)
        else:
            prices.append(x.price_usd)
    base_price = sorted(prices)[0]

    m = models.Rug.objects.get(id=model_to_dict(instance)['rug'])
    m.base_price = base_price
    m.save()
