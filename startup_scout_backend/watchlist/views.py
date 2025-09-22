from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import WatchlistItem
from .serializers import WatchlistItemSerializer


class WatchlistItemViewSet(viewsets.ModelViewSet):
    queryset = WatchlistItem.objects.all()
    serializer_class = WatchlistItemSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['startup']