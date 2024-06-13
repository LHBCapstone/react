import { React, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import SimpleNaverMap from "./SimpleNaverMap";
function NavTop() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [name, setName] = useState("");

  useEffect(() => {
    // 컴포넌트가 렌더링될 때 쿠키를 확인하여 로그인 상태를 설정합니다.
    if (cookies.user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      return;
    } // 한 번만 실행됩니다.
    const data = {
      email: cookies.user,
    };
    fetch("http://localhost:8080/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(
        (data) => {
          setName(data.name);
        },
        (err) => {
          alert(err);
        }
      );
  }, [cookies.user]);
  const handleLogout = () => {
    // 로그아웃 처리
    removeCookie("user"); // 쿠키 삭제
    setIsLoggedIn(false);
    window.location.href = "/main";
  };
  return (
    <Navbar expand="xl" bg="dark" data-bs-theme="dark" className="navTop">
      <Navbar.Brand>
        <Link className="toHome" to="/main">
          <h1>홈</h1>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link>
            <Link className="toGuide" to="/guide">
              가이드
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="SimpleNaverMap" to="/SimpleNaverMap">
              map
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="toPlan" to="/plan">
              플랜
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="toCompanion" to="/companion">
              동행
            </Link>
          </Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          {isLoggedIn ? (
            <div className="user-info">
              <div style={{ color: "white" }}>{name}님 안녕하세요!</div>;
              <Link to="/profile">회원 정보 확인</Link>' '
              <Link to="/message">채팅</Link>' '<Link to="/myPosts">내 글</Link>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          ) : (
            <div className="login">
              <Link to="/login">로그인</Link>
              <Link className="join-form-link" to="/join">
                회원가입
              </Link>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavTop;
