from django.db import models


class Startup(models.Model):
    STAGE_CHOICES = [
        ('idea', 'Idea'),
        ('mvp', 'MVP'),
        ('seed', 'Seed'),
        ('series_a', 'Series A'),
        ('series_b', 'Series B'),
        ('series_c', 'Series C'),
        ('growth', 'Growth'),
        ('ipo', 'IPO'),
    ]

    name = models.CharField(max_length=200, unique=True)
    website = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=200)
    industry = models.CharField(max_length=100)
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default='idea')
    description = models.TextField()
    tags = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

    @property
    def tag_list(self):
        """Return tags as a list"""
        if self.tags:
            return [tag.strip() for tag in self.tags.split(',') if tag.strip()]
        return []