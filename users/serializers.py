from rest_framework.serializers import HyperlinkedModelSerializer
from .models import RandUser


class UsersModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = RandUser
        fields = ('id', 'user_name', 'first_name', 'last_name', 'email', 'birthday_year')
