from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    startup_name = serializers.CharField(source='startup.name', read_only=True)
    user_username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Note
        fields = ['id', 'user', 'startup', 'startup_name', 'user_username', 'content', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']
