import logging
from django.core.management.base import BaseCommand
from api.models import Article, Source
from api.management.commands.curate_articles import curate_articles

logger = logging.getLogger(__name__)
logging.basicConfig(filename='/app/logs/manual_runs.log', filemode='a', format='%(asctime)s - %(levelname)s - %(message)s', level=logging.INFO)

class Command(BaseCommand):
    help = 'Updates articles database from sources'

    def handle(self, *args, **options):
        sources = Source.objects.values_list('feed_url', flat=True)
        articles = curate_articles(sources)

        for item in articles:
            title = item['title']
            content = item['content'].get_text() if item['content'] is not None else ""

            article, created = Article.objects.get_or_create(
                title=title,
                defaults={'content': content}
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f'Added: {title}'))
                logger.info(f"{title} added to db")
            else:
                self.stdout.write(self.style.WARNING(f'Already exists: {title}'))
                logger.info(f"{title} already exists in db")

        self.stdout.write(self.style.SUCCESS('Cron job complete'))
        logger.info('Cron job complete')
