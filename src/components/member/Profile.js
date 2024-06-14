import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [point, setPoint] = useState("");
  const [cookies, , removeCookie] = useCookies(["user"]);
  const email = cookies.user;
  const navigate = useNavigate();

  const chName = (event) => {
    setName(event.target.value);
  };
  const chPassword = (event) => {
    setPassword(event.target.value);
  };
  const chCheckPassword = (event) => {
    setCheckPassword(event.target.value);
  };

  useEffect(() => {
    if (!email) return; // email이 없으면 아무 것도 실행하지 않음

    const cookieEmail = {
      email: email,
    };

    fetch("http://localhost:8080/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(cookieEmail),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("프로필 정보를 불러오는 데 실패했습니다.");
        }
      })
      .then(
        (data) => {
          setName(data.name);
          setPoint(data.point);
        },
        (err) => {
          alert(err.message);
        }
      );
  }, [email]);

  const changePassword = () => {
    if (password !== checkPassword) {
      setPassword("");
      setCheckPassword("");
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    fetch("http://localhost:8080/user/changePw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("비밀번호 변경 완료");
          alert("다시 로그인 해주세요");
          removeCookie("user");
          navigate("/login");
        } else {
          alert("비밀번호 변경 실패");
        }
      })
      .catch((error) => {
        alert("비밀번호 변경 중 오류가 발생했습니다.");
        console.error(error);
      });
  };

  const changeName = () => {
    const data = {
      email: email,
      name: name,
    };

    fetch("http://localhost:8080/user/changeName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("이름 변경 완료");
        } else {
          alert("이름 변경 실패");
        }
      })
      .catch((error) => {
        alert("이름 변경 중 오류가 발생했습니다.");
        console.error(error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Form>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control value={email} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Point</Form.Label>
              <Form.Control value={point} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>이름</Form.Label>
              <Form.Control value={name} onChange={chName} />
              <Button variant="primary" onClick={changeName} className="mt-3">
                이름 변경
              </Button>
            </Form.Group>
            <Form.Group>
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={chPassword}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                value={checkPassword}
                onChange={chCheckPassword}
              />
              <Button
                variant="primary"
                onClick={changePassword}
                className="mt-3"
              >
                비밀번호 변경
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
