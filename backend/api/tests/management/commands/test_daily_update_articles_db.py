import pytest
import requests
from django.core.management import call_command
from api.models import Article, Source

@pytest.mark.django_db
def test_adds_articles_to_db(mock_requests_get):
    Source.objects.create(feed_url="https://example.com/atom_feed.xml")
    Source.objects.create(feed_url="https://example.com/rss_feed.xml")

    call_command('daily_update_articles_db')
    retrieved_articles = Article.objects.all()
    assert retrieved_articles[0].title == "What a year building AI has taught Stack Overflow"
    assert  "Article Title 1" in retrieved_articles[0].content
    assert retrieved_articles[0].url == "https://example.com/article-1"
    assert retrieved_articles[0].rating == 0
    assert "We sit down with Jessica Clark" in  retrieved_articles[0].excerpt
    assert retrieved_articles[0].provider == "Stack Overflow Blog"

    assert len(retrieved_articles) == 2
