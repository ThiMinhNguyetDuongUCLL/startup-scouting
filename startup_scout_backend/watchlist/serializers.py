from rest_framework import serializers
from .models import WatchlistItem


class WatchlistItemSerializer(serializers.ModelSerializer):
    startup_name = serializers.CharField(source='startup.name', read_only=True)
    
    class Meta:
        model = WatchlistItem
        fields = '__all__'
        read_only_fields = ['id', 'created_at']
