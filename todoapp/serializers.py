from rest_framework import permissions
from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from todoapp.models import *
from users.serializers import UsersModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = UsersModelSerializer()

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    permission_classes = [permissions.IsAuthenticated]
    # user = UsersModelSerializer

    class Meta:
        model = ToDo
        fields = ('id', 'from_project', 'todo_text', 'is_active', 'creat_user')
