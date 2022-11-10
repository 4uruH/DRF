from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer, StringRelatedField
from todoapp.models import *
from users.serializers import UsersModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    # users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    # user = UsersModelSerializer

    class Meta:
        model = ToDo
        fields = ('from_project', 'todo_text', 'is_active', 'creat_user')
