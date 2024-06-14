import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function NavTop() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [name, setName] = useState("");

  useEffect(() => {
    // 컴포넌트가 렌더링될 때 쿠키를 확인하여 로그인 상태를 설정합니다.
    if (cookies.user) {
      setIsLoggedIn(true);
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
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies.user]);

  const handleLogout = () => {
    // 로그아웃 처리
    removeCookie("user"); // 쿠키 삭제
    setIsLoggedIn(false);
    window.location.href = "/main"; // 로그아웃 후 이동할 페이지 주소
  };

  return (
    <Navbar expand="xl" bg="dark" variant="dark" className="navTop">
      <Navbar.Brand>
        <Link className="toHome" to="/main">
          <img
            src="https://placekitten.com/100/100" // 귀여운 고양이 이미지 URL
            alt="홈"
            className="homeLogo"
            style={{ width: "50px", height: "auto" }}
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto" style={{ fontSize: "18px" }}>
          <Nav.Link as={Link} to="/guide">
            가이드
          </Nav.Link>
          <Nav.Link as={Link} to="/SimpleNaverMap">
            추천
          </Nav.Link>
          <Nav.Link as={Link} to="/myPosts">
            내 글
          </Nav.Link>
          <Nav.Link as={Link} to="/message">
            채팅
          </Nav.Link>
        </Nav>
        <Nav>
          {isLoggedIn ? (
            <NavDropdown
              title={`${name}님 안녕하세요!`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/profile">
                회원 정보 확인
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                로그아웃
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">
                로그인
              </Nav.Link>
              <Nav.Link as={Link} to="/join">
                회원가입
              </Nav.Link>
            </Nav>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavTop;
