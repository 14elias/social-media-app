from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Myuser

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