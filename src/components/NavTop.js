import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";

function NavTop() {
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
            <Link className="toExperience" to="/experience">
                경험
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
            <div className="login">
          <Link to="/login">로그인</Link>
          <Link className="join-form-link" to="/join">
            회원가입
          </Link>
        </div>
          </Nav>
        </Navbar.Collapse>
        {/* <div className="nav-menu" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right main_menu">
            <li>
              <Link className="toGuide" to="/guide">
                가이드
              </Link>
            </li>
            <li>
              <Link className="toExperience" to="/experience">
                경험
              </Link>
            </li>
            <li>
              <Link className="toPlan" to="/plan">
                플랜
              </Link>
            </li>
            <li>
              <Link className="toCompanion" to="/companion">
                동행
              </Link>
            </li>
          </ul>
        </div>
        <div className="login">
          <Link to="/login">로그인</Link>
          <Link className="join-form-link" to="/join">
            회원가입
          </Link>
        </div> */}
    </Navbar>
  );
}

export default NavTop;
