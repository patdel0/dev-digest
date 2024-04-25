from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from api.models import Article

class ArticleAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.article1 = Article.objects.create(title="Test Article 1", content="Content of Test Article 1")
        self.article2 = Article.objects.create(title="Another Article", content="Content of Another Article")

    def test_search_by_title(self):
        response = self.client.get(reverse('article-list-create'), {'search': 'Test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Only one article should be returned
        self.assertEqual(response.data[0]['title'], "Test Article 1")

    def test_search_by_content(self):
        response = self.client.get(reverse('article-list-create'), {'search': 'Another'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Only one article should be returned
        self.assertEqual(response.data[0]['title'], "Another Article")

    def test_no_search_term(self):
        response = self.client.get(reverse('article-list-create'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # All articles should be returned
