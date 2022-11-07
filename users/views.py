from rest_framework.viewsets import ModelViewSet
from .models import RandUser
from .serializers import UsersModelSerializer


class RandUserModelViewSet(ModelViewSet):
    queryset = RandUser.objects.all()
    serializer_class = UsersModelSerializer
