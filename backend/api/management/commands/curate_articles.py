import requests
from requests.exceptions import ConnectionError, HTTPError, RequestException
import feedparser
from .scrape_article import scrape_article

def curate_articles(feeds):
    articles = []

    for feed_url in feeds:
        feed = parse_feed(feed_url)

        if not feed:
            continue

        for entry in feed.entries:
            article_dict = {
                'title': entry.title if hasattr(entry, 'title') else None,
                'link': entry.link if hasattr(entry, 'link') else None,
                'summary': entry.summary if hasattr(entry, 'summary') else None,
                'published': getattr(entry, 'published', None),
                'content': scrape_article(entry.link) if hasattr(entry, 'link') and entry.link else None,
                'provider': feed.feed.get('title', None)
            }

            print(f"Scraping article {article_dict['title']} from {feed_url}")
            articles.append(article_dict)

    return articles



def parse_feed(feed_source):
    try:
        response = requests.get(feed_source)
        response.raise_for_status()
        feed = feedparser.parse(response.text)
        return feed
    except HTTPError as e:
        print(f"HTTP error encountered while fetching {feed_source}: {str(e)}")
        return None
    except ConnectionError as e:
        print(f"Failed to connect to {feed_source}: {str(e)}")
        return None
    except RequestException as e:
        print(f"Error during requests to {feed_source}: {str(e)}")
        return None
