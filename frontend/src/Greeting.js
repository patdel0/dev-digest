import React, { useEffect, useState } from "react";
import SearchInputField from "./components/SearchInputField/SearchInputField";

function Greeting() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      fetchArticles(query);
    }
  };

  const fetchArticles = (query) => {
    const apiUrl = `http://localhost:7860/api/articles/?search=${query}`;
    console.log("Fetching articles with query:", query); // Log the search query
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
        console.log("Fetched articles:", data); // Log the fetched articles
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  const regex = new RegExp(searchQuery, "i");
  const filteredArticles = articles.filter(
    (article) => regex.test(article.title) || regex.test(article.content)
  );

  return (
    <div>
      <div>
        <SearchInputField placeholder="Search..." onSearch={handleSearch} />
      </div>
      <h1>Articles</h1>
      <ul>
        {filteredArticles.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>Rating: {article.rating}</p>
            <p>Excerpt: {article.excerpt}</p>
            <p>Provider: {article.provider}</p>
            <p>
              Published: {new Date(article.created_at).toLocaleDateString()}
            </p>
            <p>Updated: {new Date(article.updated_at).toLocaleDateString()}</p>
            <a href={article.url}>Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Greeting;
