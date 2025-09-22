from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.analytics_dashboard, name='analytics_dashboard'),
    path('export/watchlist/', views.watchlist_export, name='watchlist_export'),
]
