from django.db import models
from users.models import RandUser


class Project(models.Model):
    project_name = models.CharField(max_length=250, null=False)
    github_link = models.TextField(blank=True)
    users = models.ManyToManyField(RandUser)


class ToDo(models.Model):
    from_project = models.OneToOneField(Project, on_delete=models.CASCADE, blank=True)
    todo_text = models.TextField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    creat_user = models.ForeignKey(RandUser, on_delete=models.DO_NOTHING)
    is_active = models.BooleanField(default=True)



