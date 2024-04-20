import React, { useEffect, useState } from "react";
import SearchInputField from "./components/SearchInputField/SearchInputField"; // Import the SearchInputField component

function Greeting() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7860/api/articles/")
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div>
      <div>
        <SearchInputField
          placeholder="Search..."
          onSearch={(query) => {
            // Handle search functionality here
            console.log("Search query:", query);
          }}
        />
      </div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
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
