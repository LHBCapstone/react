import React from "react";
import Button from 'react-bootstrap/Button';
import { useState } from "react";


function Plan() {
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/message");
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div>
      <h1>Fetch Data Example</h1>
      <Button onClick={fetchData}>Fetch Data</Button>
      <p>{message}</p>
    </div>
  );
}

export default Plan;
