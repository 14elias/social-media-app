from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import createPost, get_post_view, get_posts, get_user_profile_data,CustomTokenObtainPairView,CustomTokenRefreshView,create_user_profile,authenticated, get_username, toggleFollow, toggleLike
urlpatterns =[
    path('user_data/<str:pk>/',get_user_profile_data),
    path('create_user/',create_user_profile),
    path('posts/<str:pk>/',get_post_view),
    path('authenticated/',authenticated),
    path('token/',CustomTokenObtainPairView.as_view()),
    path('token/refresh/',CustomTokenRefreshView.as_view()),
    path('toggle_follow/',toggleFollow),
    path('toggle_like/',toggleLike),
    path('create_post/',createPost),
    path('get_posts/',get_posts),
    path('get_username/',get_username),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)