from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import RandUserModelViewSet

router = DefaultRouter()
router.register('users', RandUserModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls))

]
