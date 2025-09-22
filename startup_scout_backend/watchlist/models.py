from django.db import models
from django.contrib.auth.models import User
from startups.models import Startup


class WatchlistItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='watchlist_items')
    startup = models.ForeignKey(Startup, on_delete=models.CASCADE, related_name='watchlist_items')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['user', 'startup']

    def __str__(self):
        return f"Watching {self.startup.name} by {self.user.username}"