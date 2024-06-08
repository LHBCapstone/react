import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const email = cookies.user;
  const navigate = useNavigate("");

  const chName = (event) => {
    setName(event.target.value);
  };
  const chPassword = (event) => {
    setPassword(event.target.value);
  };
  const chCheckPassword = (event) => {
    setCheckPassword(event.target.value);
  };


  //이벤트 호출을 하지 않아도 자동으로 가장먼저 호출됨
  useEffect(() => {
    const cookieEmail = {
      email: email,
    };
    const data = {
      name: name,
      password: password,
      checkPassword: checkPassword,
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
          ;
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
  }, [email]);

  //비밀번호 변경 함수
  const changePassword = () => {
    if(password!==checkPassword){
      setPassword("");
      setCheckPassword("");
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const data = {
      email : email,
      password : password
    }

    fetch("http://localhost:8080/user/changePw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
    .then((res) => res)
    .then((res) => {
      if(res.status === 200){
        alert("비밀번호 변경완료");
        alert("다시 로그인 해주세요");
        removeCookie("user"); // 쿠키 삭제
        navigate("/login");
      }else
      alert("변경 실패");
    })
  };

  //이름 변경 함수
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
      .then((res) => res)
      .then((res) => {
        if (res.status === 200) {
          alert("이름 변경 완료");
        } else {
          alert("변경 실패");
        }
      });
  };
  
  return (
    <div>
      <div>
        <Form>
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} disabled />
          <Form.Label>이름</Form.Label>
          <Form.Control value={name} onChange={chName} />
          <Button onClick={changeName}>이름 변경</Button>
          <br />
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" value={password} onChange={chPassword} />
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control type="password" value={checkPassword} onChange={chCheckPassword} />
          <Button onClick={changePassword}>비밀번호 변경</Button>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
