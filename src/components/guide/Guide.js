import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Guide = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["user"]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/guide/getGuides", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPosts(res);
      });
  }, []);

  const toRegist = () => {
    if (!cookies.user) {
      alert("로그인 해주세요");
      navigate("/login");
    } else {
      navigate("/registGuide");
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        {posts.map((guide) => (
          <Col key={guide.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Link
                  to={`/detailPage/${guide.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card.Title>{guide.title}</Card.Title>
                </Link>
                <Card.Text>{guide.content}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <Button
          onClick={toRegist}
          variant="dark"
          style={{ width: "150px", fontSize: "14px" }}
        >
          가이드 등록
        </Button>
      </div>
    </Container>
  );
};

export default Guide;
