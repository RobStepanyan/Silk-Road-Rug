from django import forms
from django.core.validators import validate_image_file_extension
from .models import Rug, RugImage


class RugAdminForm(forms.ModelForm):
    class Meta:
        model = Rug
        fields = (
            'name', 'style',
            'desc',  'sku',
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
        for upload in self.files.getlist("images"):
            image = RugImage(rug=rug, image=upload)
            image.save()
