import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User

from users.models import RandUser
from users.views import RandUserModelViewSet
from todoapp.views import ProjectModelViewSet
from todoapp.models import Project, ToDo


class TestProjectViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_rand_user(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'user_name': 'test234', 'birthday_year': 1996}, format='json')
        view = RandUserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()

        request = factory.post('/api/users/', {'user_name': 'admin23', 'birthday_year': 1986}, format='json')
        admin = User.objects.create_superuser('admin23', 'admin@admin.com',
                                              'admin123456')
        force_authenticate(request, admin)
        view = RandUserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_edit_admin(self):

        user = RandUser.objects.create(user_name='Пупктн', birthday_year=1980)
        client = APIClient()
        admin = User.objects.create_superuser('admin23', 'admin@admin.com', 'admin123456')
        client.login(username='admin23', password='admin123456')
        response = client.put(f'/api/users/{user.id}/', {'user_name': 'Пупктн', 'birthday_year': 1980})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = RandUser.objects.get(id=user.id)
        self.assertEqual(user.user_name, 'Пупктн')
        self.assertEqual(user.birthday_year, 1980)
        client.logout()


class TestToDoViewSet(APITestCase):

    def test_edit_admin(self):
        user = RandUser.objects.create(user_name='Пушкин', birthday_year=1799)
        project = Project.objects.create(project_name='книга')
        todo = ToDo.objects.create(todo_text='Пиковая дама', creat_user=user, from_project=project)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/todo/{todo.id}/', {'todo_text': 'Руслан и Людмила'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.todo_text, 'Руслан и Людмила')

    def test_get_detail_todo(self):
        todo = mixer.blend(ToDo, creat_user__last_name='Грин')
        response = self.client.get(f'/api/todo/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_todo = json.loads(response.content)
        self.assertEqual(response_todo['creat_user']['last_name'], 'Грин')
