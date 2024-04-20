from django.core.management.base import BaseCommand
from api.models import Source

class Command(BaseCommand):
    help = 'Seeds the database with Source URLs'

    def handle(self, *args, **options):
        source_urls = [
            "https://stackoverflow.blog/feed/",
            "https://dev.to/feed",
            "https://www.freecodecamp.org/news/rss",
            "https://alistapart.com/main/feed/",
            "https://cult.honeypot.io/rss.xml",
            "http://syndication.thedailywtf.com/TheDailyWtf",
            "http://feeds.dzone.com/home",
            "https://www.smashingmagazine.com/feed",
            "https://shaaf.dev/index.xml",
            "https://rss.feedspot.com/developers_rss_feeds/",
            "https://www.vinish.ai/feed",
            "https://rss.feedspot.com/developers_rss_feeds/",
            "https://developers.googleblog.com/feeds/posts/default",
            "https://www.sitepoint.com/sitepoint.rss",
            "https://tympanus.net/codrops/feed/",
            "https://www.netsolutions.com/insights/feed/",
            "https://scand.com/company/blog/feed/",
            "https://sdtimes.com/feed/",
            "https://smashinghub.com/feed",
            "https://feeds.feedburner.com/Webappers",
            "https://codeblog.jonskeet.uk/feed/",
            "https://www.pontikis.net/feed",
            "https://www.codemotion.com/magazine/feed/",
            "https://www.geeksforgeeks.org/feed/",
            "https://rss.feedspot.com/developers_rss_feeds/",
            "https://rss.feedspot.com/developers_rss_feeds/",
            "https://rss.feedspot.com/developers_rss_feeds/",
            "https://simpleprogrammer.com/feed/",
            "https://rss.feedspot.com/developers_rss_feeds/",
            "http://feeds.wordaligned.org/wordaligned",
            "https://www.codesimplicity.com/feed/"
        ]

        for url in source_urls:
            source, created = Source.objects.get_or_create(feed_url=url)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Added: {url}'))
            else:
                self.stdout.write(self.style.WARNING(f'Already exists: {url}'))
