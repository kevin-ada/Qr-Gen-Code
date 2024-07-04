from rest_framework.serializers import ModelSerializer
from qr.models import Qr


class QrSerializer(ModelSerializer):
    class Meta:
        model = Qr
        fields = ['link', 'qr_code']
        read_only_fields = ['qr_code']



