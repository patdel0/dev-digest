import React, { useEffect, useState } from "react";
import SearchInputField from "./components/SearchInputField/SearchInputField";
import ResultCard from "./components/ResultCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Greeting() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
    if (searchQuery !== "") {
      const apiUrl = `http://localhost:7860/api/articles/?search=${searchQuery}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setArticles(data);
          console.log(data);
        })
        .catch((error) => console.error("Error fetching data: ", error));
    } else {
      setArticles([]);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Stack spacing={2}>
      <div>
        <SearchInputField placeholder="Search..." onSearch={handleSearch} />
      </div>
      <h1>Articles</h1>
      {currentArticles.length > 0 ? (
        currentArticles.map((article) => (
          <ResultCard key={article.id} {...article} />
        ))
      ) : (
        <p>No articles found.</p>
      )}
      {articles.length > articlesPerPage && (
        <Pagination
          count={Math.ceil(articles.length / articlesPerPage)}
          page={currentPage}
          onChange={handleChangePage}
        />
      )}
    </Stack>
  );
}

export default Greeting;
