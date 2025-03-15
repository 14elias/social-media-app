from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Myuser, Post,Comment

class MyUserProfileSerializer(serializers.ModelSerializer):
    follower_count=serializers.SerializerMethodField()
    following_count=serializers.SerializerMethodField()
    class Meta:
        model=Myuser
        fields=['username','bio','profile_image','follower_count','following_count']
    
    def get_follower_count(self,obj):
        return obj.followers.count()
    
    def get_following_count(self,obj):
        return obj.following.count()
    
class CreateUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=Myuser
        fields=['first_name','last_name','username','password','email']
        extra_kwargs = {'password': {'write_only': True}}   
    def create(self, validated_data):
        if Myuser.objects.filter(username=validated_data['username']).exists():
            raise ValidationError({'username': 'This username already exists.'})
        
        password=validated_data.pop('password')
        user=Myuser.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class PostSerializer(serializers.ModelSerializer):
    likes_count=serializers.SerializerMethodField()
    username=serializers.SerializerMethodField()
    formatted_data=serializers.SerializerMethodField()
    profile_image=serializers.SerializerMethodField()
    image=serializers.SerializerMethodField()
    comment_count=serializers.SerializerMethodField()
    class Meta:
        model=Post
        fields=['id','username','description','formatted_data','likes','likes_count','comment_count','profile_image','image']
    
    def get_likes_count(self,obj):
        return obj.likes.count()
    
    def get_username(self,obj):
        return obj.user.username
    def get_formatted_data(self,obj):
        return obj.created_at.strftime("%d %b %y")
    def get_profile_image(self, obj): 
        if obj.user.profile_image:
            return obj.user.profile_image.url
        return None
    def get_image(self,obj):
        if obj.image:  
            return obj.image.url  
        return None
    def get_comment_count(self,obj):
        return obj.comments.count()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=Myuser
        fields=['username','profile_image','first_name','last_name','bio','email']

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Post
        fields=['image','description']
    def create(self, validated_data):
        user=self.context['user']
        description=validated_data.pop('description')
        if validated_data.get('image'):
            image=validated_data.pop('image')
        return Post.objects.create(user=user,description=description,image=image)
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields=['id','user','text','created_at','post']
        read_only_fields=['user','created_at','post']
    def create(self, validated_data):
        user=self.context['user']
        post=self.context['post']
        return Comment.objects.create(user=user,post=post,**validated_data)