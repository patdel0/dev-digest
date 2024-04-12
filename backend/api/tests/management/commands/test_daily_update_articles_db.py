import pytest
import requests
from api.models import Article, Source
from api.management.commands.daily_update_articles_db import run_cron_job

@pytest.mark.django_db
def test_adds_articles_to_db(mock_requests_get):
    Source.objects.create(feed_url="https://example.com/atom_feed.xml")
    Source.objects.create(feed_url="https://example.com/rss_feed.xml")

    cron_return = run_cron_job()
    retrieved_articles = Article.objects.all()
    assert retrieved_articles[0].title == "What a year building AI has taught Stack Overflow"
    assert  "Article Title 1" in retrieved_articles[0].content

    assert len(retrieved_articles) == 2
