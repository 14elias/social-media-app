from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MyUserProfileSerializer
from .models import Myuser
# Create your views here.

@api_view(['GET'])
def get_user_profile_data(request,pk):
    try:
        try:
            user=Myuser.objects.get(username=pk)
        except Myuser.DoesNotExist:
            return Response({'error':'user does not exist'})
        serializer=MyUserProfileSerializer(user,many=False)
        return Response(serializer.data)
    except:
        return Response({'error':'error getting user data'})
    