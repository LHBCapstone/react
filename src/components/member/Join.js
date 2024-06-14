import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Join() {
  const [firstEmail, setFirstEmail] = useState("");
  const [lastEmail, setLastEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [usableEmail, setUsableEmail] = useState(false);

  const navigate = useNavigate();

  const changeFirstEmail = (event) => {
    setFirstEmail(event.target.value);
    setUsableEmail(false);
  };

  const changeLastEmail = (event) => {
    setLastEmail(event.target.value);
    setUsableEmail(false);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changePwd = (event) => {
    setPwd(event.target.value);
  };

  const changeCheckPwd = (event) => {
    setCheckPwd(event.target.value);
  };

  const checkEmpty = () => {
    if (pwd !== checkPwd) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    } else if (firstEmail === "" || lastEmail === "") {
      alert("이메일을 입력해 주세요.");
      return false;
    } else if (name === "") {
      alert("이름을 입력해주세요.");
      return false;
    } else if (pwd === "") {
      alert("비밀번호를 입력해 주세요.");
      return false;
    } else if (!usableEmail) {
      alert("사용 가능한 이메일인지 확인해 주세요.");
      return false;
    }
    return true;
  };

  const checkEmail = () => {
    if (firstEmail === "" || lastEmail === "") {
      alert("이메일을 입력해 주세요.");
      return;
    }

    const data = {
      email: firstEmail + "@" + lastEmail,
    };

    fetch("http://localhost:8080/user/checkEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.available) {
          alert("사용 가능한 이메일입니다.");
          setUsableEmail(true);
        } else {
          alert("이미 사용중인 이메일입니다.");
          setUsableEmail(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const join = () => {
    if (!checkEmpty()) {
      return;
    }

    const data = {
      name: name,
      email: firstEmail + "@" + lastEmail,
      password: pwd,
    };

    fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("회원가입 성공");
          navigate("/login");
        } else {
          alert("회원가입 실패");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container className="join-form">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">회원가입</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>이메일</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={firstEmail}
                  onChange={changeFirstEmail}
                  placeholder="example"
                  style={{ maxWidth: "150px" }}
                />
                <span style={{ margin: "0 10px" }}>@</span>
                <Form.Control
                  type="text"
                  value={lastEmail}
                  onChange={changeLastEmail}
                  placeholder="domain.com"
                  style={{ maxWidth: "150px" }}
                />
                <Button
                  variant="outline-danger"
                  onClick={checkEmail}
                  style={{ marginLeft: "10px" }}
                >
                  이메일 중복 확인
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={changeName}
                placeholder="이름을 입력해주세요."
                style={{ maxWidth: "250px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                value={pwd}
                onChange={changePwd}
                placeholder="비밀번호를 입력해주세요."
                style={{ maxWidth: "300px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                value={checkPwd}
                onChange={changeCheckPwd}
                placeholder="비밀번호를 다시 입력해주세요."
                style={{ maxWidth: "300px" }}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="secondary" size="lg" onClick={join}>
                회원가입
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Join;
