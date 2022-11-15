from django_filters import rest_framework as filters
from .models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    project_name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['project_name']


class ToDoFilter(filters.FilterSet):
    from_project = filters.CharFilter(lookup_expr='contains')
    created_at = filters.DateFromToRangeFilter(field_name='created_at')

    class Meta:
        model = ToDo
        fields = ['from_project']

