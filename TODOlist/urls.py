from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)
from users.views import RandUserModelViewSet
from todoapp.views import ToDoModelViewSet, ProjectModelViewSet

router = DefaultRouter()
router.register('users', RandUserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todo', ToDoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
