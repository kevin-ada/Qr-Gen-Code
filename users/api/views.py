from rest_framework.generics import ListCreateAPIView
from .seriliazers import UserSignUpSerializer
from users.models import CustomUser
from rest_framework.permissions import AllowAny


class CreateUserAPIVIEW(ListCreateAPIView):
    serializer_class = UserSignUpSerializer
    queryset = CustomUser.objects.all()
    permission_classes =[AllowAny]


