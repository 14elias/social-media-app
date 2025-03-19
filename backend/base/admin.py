from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from .models import Myuser, Post,Comment
# Register your models here.
admin.site.register(Myuser)


class PostAdmin(admin.ModelAdmin):
    list_display=['id','user','description','created_at','comments_count']
    search_fields=['user','description']

    def comments_count(self,obj):
        if obj.comments:
            return obj.comments.count()

admin.site.register(Post,PostAdmin)

class CommentAdmin(admin.ModelAdmin):
    list_display=['id','user','text','created_at','post','display_reply']
    search_fields=['text','post__description','user__username']

    def display_reply(self,obj):
        if obj.reply:
            return format_html('<span style="color: red;">Reply to {}</span>', obj.reply.id)
        return format_html('<strong>Main Comment</strong>')
    display_reply.short_description="parent comment"
admin.site.register(Comment,CommentAdmin)