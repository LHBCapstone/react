import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const checkEmpty = () => {
    if (email === "") {
      alert("이메일을 입력해 주세요.");
      return true;
    } else if (password === "") {
      alert("비밀번호를 입력해 주세요.");
      return true;
    }
    return false;
  };
  const login = () => {
    const data = {
      email: email,
      password: password,
    };
    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res)
      .then((res) => {
        if (res.status === 200) {
          alert("로그인 성공");
        } else {
          alert("로그인 실패");
        }
      });
  };
  return (
    <>
      <h2>Login</h2>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="border border-warning border-3 rounded-3 p-5">
          <Form>
            <Form.Group className="mb-2" controlId="formbasicEmail">
              <Form.Label> Email </Form.Label>
              <Form.Control type="text" value={email} onChange={changeEmail} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Password </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={changePassword}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button type="button" variant="primary" onClick={login}>
                로그인
              </Button>

              <Button variant="dark">Email 찾기</Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Login;
