from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import CreateUserProfileSerializer, MyUserProfileSerializer
from .models import Myuser
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self,request ,*args,**kwargs):
        try:
            response= super().post(request,*args,**kwargs)
            token=response.data

            access_token=token['access']
            refresh_token=token['refresh']

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
        return Response(serializer.data)
    except:
        return Response({'error':'error getting user data'})

@api_view(['POST'])
@permission_classes([AllowAny])
def create_user_profile(request):
        serializer=CreateUserProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return  Response(serializer.data,status=status.HTTP_201_CREATED)