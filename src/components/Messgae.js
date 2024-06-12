import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import Talker from "./Talker";
import ShowMessage from "../ShowMessage";

const Message = () => {
  const { to } = useParams();
  const [toMember, setToMember] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [toId, setToId] = useState("");
  const [at, setAt] = useState(""); //대화 시간
  const [talk, setTalk] = useState([]); //대화내용
  const [cookies] = useCookies(["user"]);
  const user = cookies.user;

  const changeMessage = (e) => {
    setMessage(e.target.value);
  };

  const fetchMessage = () => {
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
        setMessages(res.map((value) => value.content));
      });
  };
  useEffect(() => {
    setToMember(to);
    fetch(`http://localhost:8080/getMessage/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTalk([res]);
      });
  }, [user]);
  const send = () => {
    const data = {
      content: message,
      toMember: toMember,
      fromMember: user,
    };
    fetch("http://localhost:8080/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setMessage("");
      fetchMessage();
    });
  };

  return (
    <div>
      <Talker
        email={user}
        setTo={setToMember}
        setMessage={setMessages}
        setToId={setToId}
      />
      <ShowMessage message={messages} />
      <Form.Group controlId="validationFormik101" className="position-relative">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={message}
          onChange={changeMessage}
        />
      </Form.Group>
      <Button onClick={send}>보내기</Button>
    </div>
  );
};

export default Message;
