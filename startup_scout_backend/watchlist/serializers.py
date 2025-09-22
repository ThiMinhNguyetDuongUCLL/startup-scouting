from rest_framework import serializers
from .models import WatchlistItem


class WatchlistItemSerializer(serializers.ModelSerializer):
    startup_name = serializers.CharField(source='startup.name', read_only=True)
    user_username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = WatchlistItem
        fields = ['id', 'user', 'startup', 'startup_name', 'user_username', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']
