from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from . serializers import *
from . models import CreateNote

# Create your views here.
def index(request):
    return HttpResponse('Hello Pioneer Alpha')

class CreateNoteView(generics.ListCreateAPIView):
    queryset = CreateNote.objects.all()
    serializer_class = CreateNoteSerializer

# class EditNoteView(generics.ListAPIView):
#     queryset = CreateNote.objects.all()
#     serializer_class = CreateNoteSerializer
    
class ModifyNoteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CreateNote.objects.all()
    serializer_class = CreateNoteSerializer