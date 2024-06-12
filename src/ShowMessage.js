import React from "react";

const ShowMessage = ({ message }) => {
  return (
    <div>
      {message.map((msg, index) => (
        <h6 key={index}>{msg}</h6>
      ))}
    </div>
  );
};

export default ShowMessage;
