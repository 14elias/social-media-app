from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Myuser, Post
# Register your models here.
admin.site.register(Myuser)


class PostAdmin(admin.ModelAdmin):
    list_display=['id','user','description','created_at']
    search_fields=['user','description']

admin.site.register(Post,PostAdmin)