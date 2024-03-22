from django.shortcuts import render

## Hello world API view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class HelloWorldAPIView(APIView):
    def get(self, request):
        return Response(data={"message": "Hello World"}, status=status.HTTP_200_OK)
