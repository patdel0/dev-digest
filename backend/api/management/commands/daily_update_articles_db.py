from api.models import Article, Source
from .curate_articles import curate_articles

def run_cron_job():
    sources = Source.objects.values_list('feed_url', flat=True)
    articles = curate_articles(sources)

    for item in articles:
        Article.objects.create(title=item['title'], content=item['content'].get_text())

    return articles
