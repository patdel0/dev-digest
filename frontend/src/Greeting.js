import React, { useEffect, useState } from "react";
import SearchInputField from "./components/SearchInputField/SearchInputField";
import ResultCard from "./components/ResultCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Greeting() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

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
    <Stack className="flex flex-col items-center space-y-4 p-4" spacing={2}>
      <div className="w-full max-w-md">
        <SearchInputField placeholder="Search..." onSearch={handleSearch} />
      </div>
      <h1 className="text-2xl font-bold">Articles</h1>
      {currentArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
          {currentArticles.map((article) => (
            <ResultCard key={article.id} {...article} />
          ))}
        </div>
      ) : (
        <p>No articles found.</p>
      )}
      {articles.length > articlesPerPage && (
        <Pagination
          count={Math.ceil(articles.length / articlesPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          className="mt-4"
        />
      )}
    </Stack>
  );
}

export default Greeting;
