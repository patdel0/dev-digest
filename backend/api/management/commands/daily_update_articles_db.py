from django.core.management.base import BaseCommand
from api.models import Article, Source
from api.management.commands.curate_articles import curate_articles

class Command(BaseCommand):
    help = 'Updates articles database from sources'

    def handle(self, *args, **options):
        sources = Source.objects.values_list('feed_url', flat=True)
        articles = curate_articles(sources)

        for item in articles:
            Article.objects.create(title=item['title'], content=item['content'].get_text())
            self.stdout.write(self.style.SUCCESS('Article added'))

        self.stdout.write(self.style.SUCCESS('Cron job complete'))
