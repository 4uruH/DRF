from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from todoapp.models import Project, ToDo
from todoapp.serializers import ProjectModelSerializer, ToDoModelSerializer
from .filters import ProjectFilter, ToDoFilter


# class ProjectLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


# class ToDoLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    # pagination_class = ToDoLimitOffsetPagination
    filterset_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response()


