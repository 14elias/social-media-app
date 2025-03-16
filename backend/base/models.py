from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Myuser(AbstractUser):
    username=models.CharField(max_length=50,unique=True,primary_key=True,blank=False)
    bio=models.CharField(max_length=500)
    profile_image=models.ImageField(upload_to='profile_image/',blank=True,null=True)
    followers=models.ManyToManyField('self',symmetrical=False,related_name='following',blank=True)

    def __str__(self):
        return self.username

class Post(models.Model):
    user=models.ForeignKey(Myuser,on_delete=models.CASCADE,related_name='posts')
    description=models.TextField(blank=True,null=True)
    image=models.ImageField(upload_to='post_image/',blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    likes=models.ManyToManyField(Myuser,related_name='post_like')

    def __str__(self):
        return self.description
class Comment(models.Model):
    user=models.ForeignKey(Myuser,on_delete=models.CASCADE,related_name='comments')
    post=models.ForeignKey(Post,on_delete=models.CASCADE,related_name='comments')
    text=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    reply=models.ForeignKey('self',on_delete=models.CASCADE,related_name='replies',null=True,blank=True)
    like=models.ManyToManyField(Myuser,related_name='comment_like')

    def __str__(self):
        return self.text