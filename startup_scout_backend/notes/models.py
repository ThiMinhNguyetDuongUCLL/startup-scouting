from django.db import models
from startups.models import Startup


class Note(models.Model):
    startup = models.ForeignKey(Startup, on_delete=models.CASCADE, related_name='notes')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Note for {self.startup.name}"