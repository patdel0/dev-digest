import { useEffect, useState } from 'react';

function Greeting() {
  const [greeting, setGreeting] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/hello')
      .then((response) => response.json())
      .then((data) => setGreeting(data.message))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return <h1 data-testid="greeting">{greeting}</h1>;
}

export default Greeting;
