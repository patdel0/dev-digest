# models.py
from django.db import models

class Article(models.Model):
    content = models.TextField(default="")
    title = models.TextField(default="")
    url = models.TextField(default="")
    rating = models.IntegerField(default=0)
    excerpt = models.TextField(default="")
    tags = models.JSONField(default=list)
    provider = models.TextField(default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Source(models.Model):
    feed_url = models.URLField(unique=True)

    def __str__(self):
        return self.feed_url
