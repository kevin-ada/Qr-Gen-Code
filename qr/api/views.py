from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from qr.models import Qr
from .serializers import QrSerializer


class CreateQrCodeApiView(CreateAPIView):
    queryset = Qr.objects.all()
    serializer_class = QrSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        qr_instance = serializer.save()  # This should return the newly created instance
        headers = self.get_success_headers(serializer.data)
        serializer.data['qr_code'] = qr_instance.qr_code.url
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
