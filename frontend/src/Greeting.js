import React, { useEffect, useState } from "react";
import SearchInputField from "./components/SearchInputField/SearchInputField";
import ResultCard from "./components/ResultCard"

function Greeting() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery !== "") {
      const apiUrl = `http://localhost:7860/api/articles/?search=${searchQuery}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setArticles(data);
          console.log(data);
        })
        .catch((error) => console.error("Error fetching data: ", error));
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <div>
        <SearchInputField placeholder="Search..." onSearch={handleSearch} />
      </div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <ResultCard key={article.id} {...article} />
        ))}
      </ul>
    </div>
  );
}

export default Greeting;
