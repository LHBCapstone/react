import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";

const Talker = ({ email, setTo }) => {
  const [talker, setTalker] = useState([]);
  const [messages, setMessages] = useState([]);
  const [cookies] = useCookies(["user"]);

  const showMessage = (toId) => () => {
    const data = {
      toMemberId: toId,
      fromMemberEmail: cookies.user,
    };
    fetch("http://localhost:8080/getMessageContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setTo(res[0].toMemberEmail);
        setMessages([res[0].content]);
      });
  };

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:8080/getTalker/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setTalker(res);
        });
    }
  }, [email]);

  return (
    <div>
      {talker.map((talker, index) => (
        <Button key={index} onClick={showMessage(talker.toMemberId)}>
          <h4>{talker.toMemberName}</h4>
        </Button>
      ))}
      {messages.map((message, index) => (
        <ul key={index}>
          <li key={index}>{message.content}</li>
        </ul>
      ))}
    </div>
  );
};

export default Talker;
