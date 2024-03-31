from django.urls import path
from .views import ArticleListCreate, ArticleRetrieveUpdateDestroy

urlpatterns = [
    path('articles/', ArticleListCreate.as_view(), name='article-list-create'),
    path('articles/<int:pk>/', ArticleRetrieveUpdateDestroy.as_view(), name='article-retrieve-update-destroy'),
]
