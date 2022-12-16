from django.db import models


class RandUser(models.Model):
    user_name = models.CharField(max_length=64, unique=True, null=True)
    first_name = models.CharField(max_length=64, null=True)
    last_name = models.CharField(max_length=64, null=True)
    email = models.EmailField(unique=True, null=True)
    birthday_year = models.PositiveIntegerField(null=True)
    is_stuff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

