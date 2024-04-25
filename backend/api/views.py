# api/views.py
from django.db.models import Q
from rest_framework import generics
from .models import Article, Source
from .serializers import ArticleSerializer, SourceSerializer

class ArticleListCreate(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = Article.objects.all()
        search_term = self.request.query_params.get('search', None)
        if search_term is not None:
            queryset = queryset.filter(
                Q(title__icontains=search_term) | Q(content__icontains=search_term)
            )
        return queryset
    
class ArticleRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class SourceListCreate(generics.ListCreateAPIView):
    queryset = Source.objects.all()
    serializer_class = SourceSerializer