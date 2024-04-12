import pytest
import requests
from api.management.commands.scrape_article import scrape_article

def test_scrapes_article_content(mocker):
    mock_html_article = """
    <article>
        <h1>Hacking the hamburger: How a pentester exposed holes in hundreds of fast-food chains</h1>
        <p>This is a test article content.</p>
    </article>
    """

    mock_html_content = f"""
    <html>
        <body>
            {mock_html_article}
        </body>
    </html>
    """

    mock_response = mocker.Mock()
    mock_response.status_code = 200
    mock_response.content = mock_html_content.encode('utf-8')
    mocker.patch('requests.get', return_value=mock_response)

    article = scrape_article("https://dummyurl.com/article")
    article_html = str(article)

    normalized_article_html = ' '.join(article_html.split())
    normalized_mock_article = ' '.join(mock_html_article.split())

    assert normalized_article_html == normalized_mock_article
