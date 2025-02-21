from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import get_user_profile_data,CustomTokenObtainPairView,CustomTokenRefreshView,create_user_profile
urlpatterns =[
    path('user_data/<str:pk>/',get_user_profile_data),
    path('create_user/',create_user_profile),
    path('token/',CustomTokenObtainPairView.as_view()),
    path('token/refresh/',CustomTokenRefreshView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)