import pytest

@pytest.fixture
def mock_feed_content():
    return {
        'atom_feed.xml': """
        <?xml version="1.0" encoding="utf-8"?>
        <feed xmlns="http://www.w3.org/2005/Atom">
            <title>Stack Overflow Blog</title>
            <entry>
                <title>What a year building AI has taught Stack Overflow</title>
                <link href="https://example.com/article-1"/>
                <author><name>Ben Popper</name></author>
                <updated>2024-04-05T21:02:29Z</updated>
                <summary>We sit down with Jessica Clark, a senior data scientist at Stack Overflow, to discuss how our company approaches generative AI and data quality.</summary>
            </entry>
        </feed>
        """,
        'rss_feed.xml': """
        <?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0">
            <channel>
                <title>freeCodeCamp.org</title>
                <item>
                    <title>Hello World in Rust – Example Program</title>
                    <link>https://example.com/article-2</link>
                    <author>Sahil Mahapatra</author>
                    <pubDate>Mon, 08 Apr 2024 05:21:17 -0400</pubDate>
                    <description>Starting with a new programming language is like taking your first step into a whole new world. One of the very first things you'll do is write a simple program that says "Hello World!". Rust, known for being fast and safe, is no exception. Let's jump right in and create</description>
                </item>
            </channel>
        </rss>
        """
    }

@pytest.fixture
def mock_article_content():
    return [
        """
            <html>
            <body>
                <article>
                    <h1>Article Title 1</h1>
                    <p>This is a mock article content for integration testing 1.</p>
                </article>
            </body>
            </html>
        """,
        """
            <html>
            <body>
                <article>
                    <h1>Article Title 2</h1>
                    <p>This is a mock article content for integration testing 2.</p>
                </article>
            </body>
            </html>
        """
    ]

@pytest.fixture
def mock_requests_get(mocker, mock_feed_content, mock_article_content):
    url_to_content_mapping = {
        "https://example.com/atom_feed.xml": mock_feed_content['atom_feed.xml'],
        "https://example.com/rss_feed.xml": mock_feed_content['rss_feed.xml'],
        "https://example.com/article-1": mock_article_content[0],
        "https://example.com/article-2": mock_article_content[1],
    }

    def request_get_mock(url, *args, **kwargs):
        mock_response = mocker.Mock()
        response_content = url_to_content_mapping.get(url, None)
        if response_content:
            mock_response.text = response_content
            mock_response.content = response_content.encode('utf-8')
            mock_response.status_code = 200
        else:
            mock_response.status_code = 404
            mock_response.text = ''
            mock_response.content = b''
        return mock_response

    mocker.patch('requests.get', side_effect=request_get_mock)
