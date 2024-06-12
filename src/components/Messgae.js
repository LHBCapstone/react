import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import Talker from "./Talker";
import ShowMessage from "../ShowMessage";
import Reservation from "../Reservation";

const Message = () => {
  const { to } = useParams();
  const [toMember, setToMember] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [toId, setToId] = useState("");
  const [cookies] = useCookies(["user"]);
  const [talker, setTalker] = useState([]);
  const [rsvComment, setRsvComment] = useState("예약하기");
  const user = cookies.user;

  const changeMessage = (e) => {
    setMessage(e.target.value);
  };
  const fetchTalker = () => {
    fetch(`http://localhost:8080/getTalker/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTalker(res);
      });
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
        if (Array.isArray(res)) {
          setMessages(res.map((value) => value.content));
        } else {
          console.error("Unexpected response structure:", res);
        }
      });
  };
  useEffect(() => {
    setToMember(to);
    fetch(`http://localhost:8080/getMessage/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }, [user]);
  const send = () => {
    const data = {
      content: message,
      toMember: toMember,
      fromMember: user,
    };
    if (data.toMember === data.fromMember) {
      alert("본인 계시물입니다.");
      return;
    }
    fetch("http://localhost:8080/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setMessage("");
      fetchMessage();
      fetchTalker();
    });
  };

  return (
    <div>
      <Talker
        setTalker={setTalker}
        talker={talker}
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
      <Reservation toMember={toMember} fromMember={user} />
    </div>
  );
};

export default Message;
