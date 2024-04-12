import os
import pytest
from django.conf import settings
from api.management.commands.curate_articles import parse_feed, curate_articles

def test_curate_articles_from_multiple_feeds(mock_requests_get):
    feed_urls = [
        "https://example.com/atom_feed.xml",
        "https://example.com/rss_feed.xml"
    ]
    articles = curate_articles(feed_urls)
    assert articles[0]['provider'] == "Stack Overflow Blog"
    assert articles[0]['title'] == "What a year building AI has taught Stack Overflow"
    assert "This is a mock article content for integration testing 1." in articles[0]['content'].get_text()
    assert articles[1]['provider'] == "freeCodeCamp.org"
    assert articles[1]['title'] == "Hello World in Rust – Example Program"
    assert "This is a mock article content for integration testing 2." in articles[1]['content'].get_text()
    assert len(articles) >= 2
