from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import CommentLikeToggle, CommentView, ReplyView, RetrieveCommentView, RetrievePost, RetrieveReply, createPost, get_post_view, get_posts, get_user_profile_data,CustomTokenObtainPairView,CustomTokenRefreshView,create_user_profile,authenticated, get_username, logout, search_user, toggleFollow, toggleLike, update_user_profile
urlpatterns =[
    path('user_data/<str:pk>/',get_user_profile_data),
    path('create_user/',create_user_profile),
    path('posts/<str:pk>/',get_post_view),
    path('posts_by_id/<int:pk>/',RetrievePost.as_view()),
    path('posts_by_id/<int:pk>/comment/',CommentView.as_view()),
    path('posts_by_id/<int:pk>/comment/<int:comment_id>/',RetrieveCommentView.as_view()),
    path('authenticated/',authenticated),
    path('token/',CustomTokenObtainPairView.as_view()),
    path('token/refresh/',CustomTokenRefreshView.as_view()),
    path('toggle_follow/',toggleFollow),
    path('toggle_like/',toggleLike),
    path('create_post/',createPost),
    path('get_posts/',get_posts),
    path('get_username/',get_username),
    path('search/',search_user),
    path('update/',update_user_profile),
    path('logout/',logout),
    path('posts_by_id/<int:pk>/comment/<int:comment_id>/toggle_like',CommentLikeToggle.as_view()),
    path('posts_by_id/<int:pk>/comment/<int:comment_id>/reply',ReplyView.as_view()),
    path('posts_by_id/<int:pk>/comment/<int:comment_id>/reply/<int:reply_id>/',RetrieveReply.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
