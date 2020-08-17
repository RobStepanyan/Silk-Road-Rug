from django.db import models

styles = [
    '****Antique****',
    'Khotan',
    'Samarkand',
    'Chinese',
    'Afghan',
    'Balouch',
    'Afshar',
    'Turkaman',
    'Ersari',
    'Bukara',
    'Tekke',

    '****Antique Persian****',
    'Malayer',
    'Tabriz',
    'Sultanabad',
    'Mahal',
    'Mahal',
    'Farahan',
    'Kerman',
    'Khorassan',
    'Heriz',
    'Serapi',
    'Sarab / Camel',
    'Bakhshaish',
    'Bakhtiari',
    'Bidjar',

    '****Persian Traditional****',
    'Kashan',
    'Mashad',
    'Isfahan',
    'Tehran',
    'Qum',
    'Nain',

    '****Antique Armenian / Caucasian****',
    'Karabagh',
    'Soumack',
    'Shirvan',
    'Caucasian',
    'Kazak',

    '****Antique Turkish****',
    'Ghiordes',
    'Sivas',
    'Hereke',
    'Kaysari',
    'Kilim',
    'Oushak',

    '****Antique Indian****',
    'Agra',
    'Amritsar',
    'Dhurrie',
    'Kashmir',
    'Lahour',
    'Larestan',

    '****Antique European****',
    'Tapestery',
    'French Deco',
    'French Aubusson',
    'French Savonerrie',
    'Spanish',
    'Donegal',
    'Arts and Crafts',
    'Bessarabian / Ukrainian',
    'Italian Textile',

    '****Contemporary Moroccan****',
    'High Atlas Collection',
    'African Tuareg Mat',

    '****Other Contemporary Rugs****',
    'Antique Inspired / Recreation',
    'Swedish / Scandinavian Recreation',
    'Modern',
    'Modern Flat Weave',
    'Afghan Modern Flat Weave',

    '****Vintage****',
    'Turkish',
    'Kilim / Flat Weave',
    'Over-Dyed Distressed',
    'Tulu',
    'Morrocan',

    '****Vintage Swedish / Scandinavian****',
    'Ingegerd',
    'Marta Mass Fjetterstrom',
    'Judith',
    'Swedish',
    'Scandinavian',

    '****Other****',
    'Saddle Bags',
    'Gallery-Size',
    'Furniture / Accessories',
    'Sustainable',
    'Decorative',
    'Ethnic',
    'Traditional',
    'Natural & Broad Loom',
    'Custom Order'
]

STYLES = [(styles.index(x), x) for x in styles]


class Rug(models.Model):
    name = models.CharField(verbose_name="Rug's Name", max_length=256)
    width_feet = models.IntegerField(verbose_name="Width Feet X'")
    width_inch = models.IntegerField(
        verbose_name="Width Inch X\"", blank=True, null=True)
    height_feet = models.IntegerField(verbose_name="Height Feet X'")
    height_inch = models.IntegerField(
        verbose_name="Height Inch X\"", blank=True, null=True)
    style = models.IntegerField(
        verbose_name="Style (e.g. Moroccan)", choices=STYLES)
    price_usd = models.DecimalField(
        verbose_name="Price (USD)", max_digits=12, decimal_places=2, default=0)
    price_usd_after_sale = models.DecimalField(
        verbose_name="Price (USD) After Sale", max_digits=12, decimal_places=2, blank=True, null=True)
    desc = models.TextField(verbose_name='Description', blank=True, null=True)
    quanity = models.IntegerField(
        verbose_name='Quanity (Available)', default=1)
    sku = models.CharField(verbose_name='SKU', max_length=255)

    def __str__(self):
        return self.name


class RugImage(models.Model):
    image = models.ImageField(upload_to='rugs')
    # related_name (images = Rug(...).images)
    rug = models.ForeignKey(
        Rug, on_delete=models.CASCADE, related_name='images')

    def __str__(self):
        return ''
