from rest_framework import serializers
from .models import Startup


class StartupSerializer(serializers.ModelSerializer):
    tag_list = serializers.ReadOnlyField()
    
    class Meta:
        model = Startup
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']
