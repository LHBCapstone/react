import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Talker from "./Talker";
import ShowMessage from "../ShowMessage";
import Reservation from "./Reservation";

const Message = () => {
  const { to: toMemberId, guideId } = useParams();
  const [toMember, setToMember] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [toId, setToId] = useState("");
  const [cookies] = useCookies(["user"]);
  const [talker, setTalker] = useState([]);
  const user = cookies.user;
  const navigate = useNavigate("");

  const toRes = () => {
    navigate(`/detailPage/${guideId}`);
  };

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
    setToMember(toMemberId);
    fetch(`http://localhost:8080/getMessage/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }, [user, toMemberId]);

  const send = () => {
    const data = {
      content: message,
      toMember: toMember,
      fromMember: user,
    };

    if (data.toMember === data.fromMember) {
      alert("본인 게시물입니다.");
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
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <Talker
            setTalker={setTalker}
            talker={talker}
            email={user}
            setTo={setToMember}
            setMessage={setMessages}
            setToId={setToId}
          />
          <ShowMessage message={messages} />
          <Form.Group controlId="messageForm">
            <Form.Control
              type="text"
              placeholder="메세지를 입력하세요."
              value={message}
              onChange={changeMessage}
            />
          </Form.Group>
          <Button variant="primary" onClick={send} className="me-2">
            보내기
          </Button>
          <Button variant="secondary" onClick={toRes}>
            예약하러 가기
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Message;
