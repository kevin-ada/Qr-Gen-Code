from django.urls import path
from qr.api import views

urlpatterns = [
    path('api/create/', views.CreateQrCodeApiView.as_view(), name='qr-create'),
]