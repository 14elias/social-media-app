from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import CommentSerializer, CreatePostSerializer, CreateUserProfileSerializer, MyUserProfileSerializer, PostSerializer, UserSerializer
from .models import Myuser, Post,Comment
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
import json

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self,request ,*args,**kwargs):
        try:
            response= super().post(request,*args,**kwargs)
            token=response.data

            access_token=token['access']
            refresh_token=token['refresh']
            username = request.data['username']

            res=Response()
            user=Myuser.objects.get(username=username)

            res.data={'success':True,'user':{
                'username':user.username,
                'bio':user.bio,
                'email':user.email,
                'first_name':user.first_name,
                'last_name':user.last_name
            }}

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            return res
        except:
            return Response({'success':False})
        
class CustomTokenRefreshView(TokenRefreshView):
    def post(self,request,*args,**kwargs):
        try:
            refresh_token=request.COOKIES.get('refresh_token')
            request.data['refresh']=refresh_token

            response= super().post(request,*args,**kwargs)
            tokens=response.data
            access_token=tokens['access']

            res=Response()
            res.data={'success':True}

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            return res
        except:
            return Response({'success':False})




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile_data(request,pk):
    try:
        try:
            user=Myuser.objects.get(username=pk)
        except Myuser.DoesNotExist:
            return Response({'error':'user does not exist'})
        serializer=MyUserProfileSerializer(user,many=False)

        following=False

        if request.user in user.followers.all():
            following=True

        return Response({**serializer.data,'is_our_profile':request.user.username==user.username,'following':following})
    except:
        return Response({'error':'error getting user data'})

@api_view(['POST'])
@permission_classes([AllowAny])
def create_user_profile(request):
        serializer=CreateUserProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return  Response(serializer.data,status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def authenticated(request):
    return Response('authenticated')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggleFollow(request):
    try:
        try:
            my_user=Myuser.objects.get(username=request.user.username)
            user_to_follow=Myuser.objects.get(username=request.data['username'])
        except Myuser.DoesNotExist:
            return Response({'error':'doesnot exist'})
        if my_user in user_to_follow.followers.all():
            user_to_follow.followers.remove(my_user)
            return Response({'now_following':False})
        else:
            user_to_follow.followers.add(my_user)
            return Response({'now_following':True})
    except:
        return Response({'error':'error following user'})
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_post_view(request,pk):
    try:
        user=Myuser.objects.prefetch_related('posts').get(username=pk)
        my_user=Myuser.objects.get(username=request.user.username)
    except Myuser.DoesNotExist:
        return Response ({'error':'user does not exist'})
    
    post=user.posts.all().order_by('-created_at')
    serializer=PostSerializer(post,many=True)

    data=[]
    for posts in serializer.data:
        new_post={**posts,'liked':my_user.username in posts['likes']}
        data.append(new_post)
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggleLike(request):
    try:
        try:
            post=Post.objects.get(id=request.data['id'])
        except Post.DoesNotExist:
            return Response({'error':'post does not exist'})
        try:
            user=Myuser.objects.get(username=request.user.username)
        except Myuser.DoesNotExist:
            return Response({'error':'user does not exist'})
        if user in post.likes.all():
            post.likes.remove(user)
            return Response({'now_liked':False})
        else:
            post.likes.add(user)
            return Response({'now_liked':True})
    except:
        return Response({'error':'failed to like'})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPost(request):
    try:
        print(request.data)
        serializer = CreatePostSerializer(context={'user': request.user},data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except KeyError:
        return Response({'error': 'Missing description field'}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_posts(request):
    try:
        user=Myuser.objects.get(username=request.user.username)
    except Myuser.DoesNotExist:
        return Response({'error':'user does not exist'})
    
    posts=Post.objects.all().order_by('-created_at')
    paginator=PageNumberPagination()
    paginator.page_size=10
    result_page=paginator.paginate_queryset(posts,request)
    serializer=PostSerializer(result_page,many=True,context={'request':request})
    data=[]
    for post in serializer.data:
        new_post={}
        if user.username in post['likes']:
            new_post={**post,'liked':True}
        else:
            new_post={**post,'liked':False}
        data.append(new_post)
    return paginator.get_paginated_response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_username(request):
    username=request.user.username
    return Response({'username':username})

@api_view(['GET'])
@permission_classes({IsAuthenticated})
def search_user(request):
    query=request.query_params.get('query','')
    user=Myuser.objects.filter(username__icontains=query)
    serializer=UserSerializer(user,many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    data=request.data

    try:
        user=Myuser.objects.get(username=request.user.username)
    except Myuser.DoesNotExist:
        return Response({'error':'user does not exist'})
    
    serializer=UserSerializer(user,data,partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({**serializer.data,'success':True})
    return Response({**serializer.errors,'success':False})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        res=Response()
        res.data={'success':True}
        res.delete_cookie('access_token' , path='/' , samesite='None')
        res.delete_cookie('refresh_token' , path='/' , samesite='None')
        return res
    except:
        return Response({'success':False})
class CommentView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,*args,**kwargs):
        print(json.dumps(request.data, indent=4))
        post=get_object_or_404(Post,id=self.kwargs['pk'])
        serializer=CommentSerializer(data=request.data,context={'user':request.user,'post':post})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    def get(self,request,*args,**kwargs):
        post=get_object_or_404(Post,id=self.kwargs['pk'])
        comments=post.comments.all()
        serializer=CommentSerializer(comments,many=True)
        return Response(serializer.data)
class RetrievePost(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,*args,**kwargs):
        post=get_object_or_404(Post,id=self.kwargs['pk'])
        serializer=PostSerializer(post,many=False)
        return Response(serializer.data)
class RetrieveCommentView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request,*args,**kwargs):
        post=Post.objects.get(id=self.kwargs['pk'])
        comment=post.comments.get(id=self.kwargs['comment_id'])
        serializer=CommentSerializer(comment,many=False)
        return Response(serializer.data)
    def delete(self,request,*args,**kwargs):
        post=Post.objects.get(id=self.kwargs['pk'])
        comment=post.comments.get(id=self.kwargs['comment_id'])
        if comment.user!=request.user:
            return Response({'error':'you are not allowed to delete this comment'})
        comment.delete()
        return Response({'success':True},status=status.HTTP_204_NO_CONTENT)
    def patch(self,request,*args,**kwargs):
        post=Post.objects.get(id=self.kwargs['pk'])
        comment=post.comments.get(id=self.kwargs['comment_id'])
        if comment.user!=request.user:
            return Response({'error':'you are not allowed to edit this comment'})
        serializer=CommentSerializer(comment,data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)