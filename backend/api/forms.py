from django import forms
from django.core.validators import validate_image_file_extension
from .models import Rug, RugImage


class RugAdminForm(forms.ModelForm):
    class Meta:
        model = Rug
        fields = (
            'name', 'group_by_age',
            'group_by_type',
            'desc',  'sku',
            'WC', 'GS', 'IN',
            'ES', 'SR', 'WG',
        )

    images = forms.FileField(
        widget=forms.ClearableFileInput(attrs={"multiple": True}),
        label="Images",
        required=False,
    )

    def clean_images(self):
        """Make sure only images can be uploaded."""
        for upload in self.files.getlist("images"):
            validate_image_file_extension(upload)

    def save_images(self, rug):
        """Process each uploaded image."""
        if not self.files.getlist("images") and not RugImage.objects.filter(rug=rug).exists():
            # image attribute will take its default value
            image = RugImage(rug=rug)
            image.save()
        else:
            for x in RugImage.objects.filter(rug=rug):
                if 'default' in str(x.image):
                    x.delete()

            for upload in self.files.getlist("images"):
                image = RugImage(rug=rug, image=upload)
                image.save()
