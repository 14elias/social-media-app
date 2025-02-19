from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Myuser(AbstractUser):
    username=models.CharField(max_length=50,unique=True,primary_key=True)
    bio=models.CharField(max_length=500)
    profile_image=models.ImageField(upload_to='profile_image/',blank=True,null=True)
    followers=models.ManyToManyField('self',symmetrical=False,related_name='following',blank=True)

    def __str__(self):
        return self.username