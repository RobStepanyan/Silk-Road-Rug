from PIL import Image
from django.contrib.postgres.fields import ArrayField
from django.db import models
from . import variables
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone
from django.utils.functional import cached_property
from django.conf import settings


class RugGroup(models.Model):
    TYPES = (('a', 'Age (e.g. Vintage)'), ('t', 'Type (e.g. Runner)'))
    type = models.CharField(max_length=1, choices=TYPES, default='a')
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, default=None, blank=True)
    image = models.ImageField(upload_to='rug-groups',
                              default='default-rug.png')
    parent_group = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, default=None, blank=True)
    tree_ids = ArrayField(models.IntegerField(
    ), verbose_name="tree_ids (FILLED AUTOMATICALLY)", default=list)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path)
        x = img.width / img.height
        size = (320, int(320 / x))
        if img.width > 320:
            img.thumbnail(size)
            img.save(self.image.path)

    @cached_property
    def tree(self):
        group = self
        tree = [{'id': group.id, 'title': group.title}]
        while group.parent_group:
            group = group.parent_group
            tree.append({'id': group.id, 'title': group.title})
        return tree[::-1]

    @cached_property
    def children(self):
        children = self.__class__.objects.filter(
            parent_group=self).values('id', 'title', 'image')
        for x in children:
            x['image'] = settings.MEDIA_URL + x['image']
        return children

    def __str__(self):
        return " > ".join([x['title'] for x in self.tree])


class Rug(models.Model):
    name = models.CharField(
        max_length=256)
    base_price = models.DecimalField(
        max_digits=12, decimal_places=2, default=0,
        blank=True, null=True)
    base_price_before_sale = models.DecimalField(
        max_digits=12, decimal_places=2, default=0,
        blank=True, null=True)
    base_price_after_sale = models.DecimalField(
        max_digits=12, decimal_places=2, default=0,
        blank=True, null=True)
    group_by_age = models.ForeignKey(
        RugGroup, on_delete=models.PROTECT, verbose_name="Group by Age (e.g. Vintage)",
        blank=True, default=None, null=True, related_name='rug_a',)
    group_by_type = models.ForeignKey(
        RugGroup, on_delete=models.PROTECT, verbose_name="Group by Type (e.g. Runner)",
        blank=True, default=None, null=True)
    desc = models.TextField(
        verbose_name='Description', blank=True, null=True)
    sku = models.CharField(max_length=255)
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

    @cached_property
    def groups(self):
        x = []
        if self.group_by_age:
            x.append({'title': self.group_by_age.title,
                      'tree': self.group_by_age.tree})
        if self.group_by_type:
            x.append({'title': self.group_by_type.title,
                      'tree': self.group_by_type.tree})
        return x

    def __str__(self):
        return self.name if self.name else ''


class RugImage(models.Model):
    rug = models.ForeignKey(Rug, on_delete=models.CASCADE,
                            related_query_name='images', related_name='images')
    # include "default" see signals.py
    image = models.ImageField(
        upload_to='rugs', default='default-rug.png')

    def __str__(self):
        return self.rug.name + ' \'s Image'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path)
        x = img.width / img.height
        size = (1000, int(1000 / x))
        if img.width > 1000:
            img.thumbnail(size)
            img.save(self.image.path)


class RugVariation(models.Model):
    rug = models.ForeignKey(Rug, on_delete=models.CASCADE,
                            related_query_name='variations', related_name='variations')
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
        return self.rug.name[:20] + f'... {self.width_feet}\'x{self.height_feet}\' ${self.price_usd}'

    class Meta:
        ordering = ['rug', 'width_feet']


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    country = models.CharField(max_length=2, choices=variables.COUNTRIES)
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True, default='')
    city = models.CharField(max_length=255)
    state_province_region = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=10)
    phone_number = PhoneNumberField()
    delivery_instructions = models.TextField(
        null=True, blank=True, default=None)
    is_primary = models.BooleanField(default=False)

    class Meta:
        ordering = ('-is_primary',)

    def __str__(self):
        return self.full_name + ' ' + self.address_line_1

    def __repr__(self):
        self.__str__()


class AbstractCartItem(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_query_name='cart_items')
    rug = models.ForeignKey(Rug, on_delete=models.CASCADE)
    rug_variation = models.ForeignKey(RugVariation, on_delete=models.CASCADE)

    def default_selecteds():
        return ['GS']

    selecteds = ArrayField(
        models.CharField(
            max_length=2, choices=variables.ADDITIONAL_SERVICES + variables.SHIPPING_METHODS,
        ),
        size=len(variables.ADDITIONAL_SERVICES) +
        len(variables.SHIPPING_METHODS),
        default=default_selecteds,
        help_text=" | ".join(
            [x[0] + " - " + x[1] for x in (variables.ADDITIONAL_SERVICES + variables.SHIPPING_METHODS)])
    )
    quantity = models.IntegerField(default=1)

    class Meta:
        abstract = True


class CartItem(AbstractCartItem):
    pass


class Order(AbstractCartItem):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_query_name='orders')

    # Same as in stripe
    PAYMENT_STATUSES = (
        ('paid', 'Paid'),
        ('unpaid', 'Unpaid'),
    )
    DELIVERY_STATUSES = (
        ('i', 'In Shop'),
        ('s', 'Sent'),
        ('d', 'Delivered'),
    )
    ordered_at = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=6, choices=PAYMENT_STATUSES)
    forecasted_arrival = models.DateTimeField(
        blank=True, null=True, default=None)
    tracking_url = models.URLField(blank=True, null=True, default=None)
    delivery_address = models.ForeignKey(
        Address, on_delete=models.PROTECT, default=None, blank=True, null=True)
    delivery_status = models.CharField(
        max_length=1, choices=DELIVERY_STATUSES, default='i')
    total = models.DecimalField(
        verbose_name="Order Total",
        max_digits=12, decimal_places=2, default=0)

    def __str__(self):
        return User.objects.get(id=self.user.id).username + "'s Order"


class PendingUserPersonalInfoUpdate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email_to = models.EmailField()
    first_name_to = models.CharField(max_length=255)
    last_name_to = models.CharField(max_length=255)


class PendingUserPwdChange(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    password_to = models.CharField(max_length=255)


class CheckoutSession(models.Model):
    stripe_checkout_sess_id = models.CharField(max_length=100)
    stripe_payment_intent_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # (below) Thats why we don't use foreign key here
    # (postgres.E002) Base field for array cannot be a related field.
    order_models = ArrayField(
        models.CharField(max_length=24),
        default=list
    )
    rug_models = ArrayField(
        models.CharField(max_length=24),
        default=list
    )


class ContactUs(models.Model):
    title = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    file = models.FileField(upload_to='contact-us')
    status = models.CharField(max_length=1, default='n', choices=(
        ('n', 'Not Reviewed'), ('r', 'Reviewed')))

    class Meta:
        verbose_name = 'Contact Us Request'
