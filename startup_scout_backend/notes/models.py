from django.db import models
from django.contrib.auth.models import User
from startups.models import Startup


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    startup = models.ForeignKey(Startup, on_delete=models.CASCADE, related_name='notes')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['user', 'startup']

    def __str__(self):
        return f"Note for {self.startup.name} by {self.user.username}"