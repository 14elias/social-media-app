# Generated by Django 5.1.6 on 2025-03-12 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_alter_post_created_at_alter_post_likes'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='post_image/'),
        ),
    ]
