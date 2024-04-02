import { useEffect, useState } from "react";
import React from "react";
import { Button } from "./stories/Button";
import TDDButton from './components/TDDButton'

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
      <Button label="Button" onClick={() => {}} primary />{" "}
      <TDDButton/>
    </div>
  );
}

export default Greeting;
