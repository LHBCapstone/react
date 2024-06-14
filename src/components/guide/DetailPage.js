import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import Reservation from "../Reservation";

const DetailPage = () => {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [toMember, setToMember] = useState("");
  const [guideId, setGuideId] = useState("");
  const [fromMember, setFromMember] = useState("");
  const { id } = useParams();

  const [cookie] = useCookies(["user"]);

  useEffect(() => {
    setGuideId(id);
    setFromMember(cookie.user);

    fetch(`http://localhost:8080/guide/getGuide/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTitle(res.title);
        setWriter(res.member.name);
        setContent(res.content);
        setPrice(res.price);
        setToMember(res.member.email);
      });
  }, [id, cookie.user]);

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Row className="justify-content-center mb-3">
            <h1>{title}</h1>
          </Row>
          <Row className="mb-3">
            <Col>
              <p className="text-end">{writer}</p>
            </Col>
          </Row>
          <Card.Text>{content}</Card.Text>
          <Card.Text>가격: {price}원</Card.Text>
          <Row className="justify-content-center mt-3">
            <Col className="d-flex justify-content-center">
              <Link to={`/message/${toMember}/${guideId}`} className="me-3">
                <Button variant="primary">메세지 보내기</Button>
              </Link>
              <Reservation
                guideId={guideId}
                toMember={toMember}
                fromMember={fromMember}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetailPage;
