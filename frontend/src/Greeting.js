import React, { useEffect, useState } from "react";
import SearchInputField from "./components/SearchInputField/SearchInputField";

function Greeting() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const apiUrl = `http://localhost:7860/api/articles/?search=${searchQuery}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {setArticles(data); console.log(data)})
      .catch((error) => console.error("Error fetching data: ", error));
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredArticles = searchQuery
    ? articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
