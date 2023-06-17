from rest_framework import serializers
from .models import *


class CreateNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateNote
        fields = ['id', 'title', 'description', 'created_at', 'updated_at']