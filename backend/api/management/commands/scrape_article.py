import requests
from bs4 import BeautifulSoup

def scrape_article(url):
    response = requests.get(url)

    if response.status_code != 200:
        return None

    soup = BeautifulSoup(response.content, 'html.parser')
    article = soup.find('article')
    return article
