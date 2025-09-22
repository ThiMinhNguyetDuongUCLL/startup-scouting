from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WatchlistItemViewSet

router = DefaultRouter()
router.register(r'watchlist', WatchlistItemViewSet, basename='watchlistitem')

urlpatterns = [
    path('', include(router.urls)),
]
