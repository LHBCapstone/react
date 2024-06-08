import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Join() {
  // 회원가입에 필요한 정보 선언
  const [firstEmail, setFirstEmail] = useState("");
  const [lastEmail, setLastEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [usableEmail, setUsableEmail] = useState(false);

  const navigate = useNavigate();

  //입력이 들어올때마다 email이 업데이트됨
  const changeFirstEmail = (event) => {
    setFirstEmail(event.target.value);
    //이메일 확인을 하고 이메일 변경이 있으면 다시 false
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
    } else if (firstEmail === "") {
      alert("이메일을 입력해 주세요.");
      return false;
    } else if (lastEmail === "") {
      alert("빈칸이 있습니다.");
      return false;
    } else if (name === "") {
      alert("이름을 입력해주세요.");
      return false;
    } else if (pwd === "") {
      alert("비밀번호를 입력해 주세요.");
      return;
    } else if (usableEmail === false) {
      alert("사용 가능한 이메일인지 확인해 주세요.");
      return false;
    }
    return true;
  };
  /* 이메일 중복 체크 */
  const checkEmail = () => {
    if (firstEmail === "") {
      alert("빈 칸이 있습니다.");
      return;
    }
    if (lastEmail === "") {
      alert("빈칸이 있습니다.");
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
      .then((res) => res)
      .then((res) => {
        if (res.status === 200) {
          alert("사용가능");
          setUsableEmail(true);
          return;
        } else {
          alert("이미 사용중인 이메일");
          setUsableEmail(false);
          return;
        }
      });
  };

    /* 회원가입 */
  const join = () => {
    if (!usableEmail) {
      alert("사용 가능한 이메일인지 확인해 주세요.");
      return;
    }
    if(!checkEmpty()){
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
      .then((res) => res)
      .then((res) => {
        if (res.status === 200) {
          alert("회원가입 성공");
          navigate("/login");
        } else {
          console.log(res.status);
        }
      });
  };

  return (
    <div className="join-form">
      <table className="table">
        <tbody>
          <tr>
            <th className="col-2">이메일</th>
            <td>
              <input
                type="text"
                value={firstEmail}
                onChange={changeFirstEmail}
                size="50px"
              />
              @
              <input
                type="text"
                value={lastEmail}
                onChange={changeLastEmail}
                size="50px"
              />{" "}
              &nbsp; &nbsp;
              <button className="btn btn-outline-danger" onClick={checkEmail}>
                <i className="fas fa-check"></i> 이메일 중복 확인
              </button>
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td>
              <Form.Control
                type="text"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={changeName}
              />
            </td>
          </tr>

          <tr>
            <th>비밀번호</th>
            <td>
              <input
                type="password"
                value={pwd}
                onChange={changePwd}
                size="50px"
                autoCorrect="off"
              />
            </td>
          </tr>

          <tr>
            <th>비밀번호 확인</th>
            <td>
              <input
                type="password"
                value={checkPwd}
                onChange={changeCheckPwd}
                size="50px"
                autoCorrect="off"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <div className="my-3 d-flex justify-content-center">
        <button className="btn btn-outline-secondary" onClick={join}>
          <i className="fas fa-user-plus"></i> 회원가입
        </button>
      </div>
    </div>
  );
}

export default Join;
