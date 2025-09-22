from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    startup_name = serializers.CharField(source='startup.name', read_only=True)
    
    class Meta:
        model = Note
        fields = '__all__'
        read_only_fields = ['id', 'created_at']
