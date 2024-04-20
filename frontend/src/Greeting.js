import React, { useEffect, useState } from "react";
import { Button } from "./stories/Button";
import SearchInputField from "./components/SearchInputField/SearchInputField"; // Import the SearchInputField component

function Greeting() {
  const [greeting, setGreeting] = useState(null);

  useEffect(() => {
    fetch("https://patdel0-dev-digest-backend.hf.space/api/hello/")
      .then((response) => response.json())
      .then((data) => setGreeting(data.message))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div>
      <h1 data-testid="greeting">{greeting}</h1>
      <Button label="Button" onClick={() => {}} primary />
      <div>
        <SearchInputField
          placeholder="Search..."
          onSearch={(query) => {
            // Handle search functionality here
            console.log("Search query:", query);
          }}
        />
      </div>
    </div>
  );
}

export default Greeting;
