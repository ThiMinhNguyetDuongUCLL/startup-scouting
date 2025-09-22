from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import WatchlistItem
from .serializers import WatchlistItemSerializer


class WatchlistItemViewSet(viewsets.ModelViewSet):
    serializer_class = WatchlistItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['startup']
    
    def get_queryset(self):
        return WatchlistItem.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)