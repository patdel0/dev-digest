import requests
import feedparser
from .scrape_article import scrape_article

def curate_articles(feeds):
    articles = []

    for feed_url in feeds:
        feed = parse_feed(feed_url)

        for entry in feed.entries:
            article_dict = {
                'title': entry.title,
                'link': entry.link,
                'summary': entry.summary,
                'published': entry.get('published', ''),
                'content': scrape_article(entry.link),
                'provider': feed.feed.get('title', feed_url)
            }

            print(f"Scraping article {article_dict['title']}")
            articles.append(article_dict)

    return articles


def parse_feed(feed_source):
    response = requests.get(feed_source)

    if response.status_code != 200:
        raise Exception(f"Failed to fetch feed content. Status code: {response.status_code}")

    content = response.text
    feed = feedparser.parse(content)
    return feed
