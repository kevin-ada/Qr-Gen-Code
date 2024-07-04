from django.urls import path
from users.api.views import CreateUserAPIVIEW
urlpatterns = [
    path('api/create/',CreateUserAPIVIEW.as_view(), name='user-create')

]