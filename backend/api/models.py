# models.py
from django.db import models

class Article(models.Model):
    content = models.TextField()
    title = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Source(models.Model):
    feed_url = models.URLField(unique=True)

    def __str__(self):
        return self.feed_url
