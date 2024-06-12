import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import ShowMessage from "../ShowMessage";

const Talker = ({ email, setTo, setMessage, setToId }) => {
  const [talker, setTalker] = useState([]);
  const [messages, setMessages] = useState([]);
  const [cookies] = useCookies(["user"]);
  const [toMemberEmail, setToMemberEmail] = useState("");

  const showMessage = (toId, index) => () => {
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
        setTo(talker[index].toMemberEmail);
        setMessages(res.map((value) => value.content));
        setToMemberEmail(talker[index]);
        setMessage(res.map((value) => value.content));
        setToId(talker[index].toMemberId);
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
        <Button key={index} onClick={showMessage(talker.toMemberId, index)}>
          <h4>{talker.toMemberName}</h4>
        </Button>
      ))}
    </div>
  );
};

export default Talker;
