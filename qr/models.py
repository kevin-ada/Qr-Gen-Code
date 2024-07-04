import os
import pyqrcode
from django.db import models
from django.utils.text import slugify

class Qr(models.Model):
    link = models.URLField()
    qr_code = models.ImageField(upload_to='qr_codes', blank=True)

    def save(self, *args, **kwargs):
        qr = pyqrcode.create(self.link)
        directory = "media/qr_codes"  # Ensure this directory is within the media directory
        if not os.path.exists(directory):
            os.makedirs(directory)
        filename = f"{slugify(self.link)}_qr.svg"
        filepath = os.path.join(directory, filename)
        qr.svg(filepath, scale=8)
        self.qr_code = filepath.replace('media/', '')  # Store the relative path
        super().save(*args, **kwargs)
