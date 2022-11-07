from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = "add a number of users use '-s' to create a superuser"

    def add_arguments(self, parser):
        parser.add_argument('count', type=int, help='number of users to be created')
        parser.add_argument('-s', '--superuser', action='store_true', help='Create a superuser account')

    def handle(self, *args, **kwargs):
        count = kwargs['count']
        superuser = kwargs['superuser']
        for i in range(count):
            User.objects.create_user(username=get_random_string(), email='a@a.ru', password='123')
            if superuser:
                User.objects.create_superuser(username=get_random_string(), eemail='a@a.ru', password='123')
            else:
                User.objects.create_user(username=get_random_string(), eemail='a@a.ru', password='123')