import requests
import feedparser
from .scrape_article import scrape_article

def curate_articles(feeds):
    articles = []

    for feed_path in feeds:
        feed = parse_feed(feed_path)

        for entry in feed.entries:
            entry.content = scrape_article(entry.link)
            entry.provider = feed.channel.title
            articles.append(entry)

    return articles


def parse_feed(feed_source):
    response = requests.get(feed_source)

    if response.status_code != 200:
        raise Exception(f"Failed to fetch feed content. Status code: {response.status_code}")

    content = response.text
    feed = feedparser.parse(content)
    return feed
