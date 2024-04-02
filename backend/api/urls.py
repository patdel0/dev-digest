from django.urls import path
from .views import ArticleListCreate, ArticleRetrieveUpdateDestroy, SourceListCreate

urlpatterns = [
    path('articles/', ArticleListCreate.as_view(), name='article-list-create'),
    path('articles/<int:pk>/', ArticleRetrieveUpdateDestroy.as_view(), name='article-retrieve-update-destroy'),
    path('sources/', SourceListCreate.as_view(), name='source-list-create'),

]
