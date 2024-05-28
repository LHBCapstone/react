import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";

const Profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const email = cookies.user;

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
      .then((res) => res)
      .then(
        (res) => {
          if (res.status === 200) {
            alert(res.name);
            setName(res.name);
          } else {
            alert("로그인 실패");
          }
        },
        (err) => {
          alert(err);
        }
      );
  });

  const changePassword = () => {};
  const changeName = () => {};
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
          <Form.Control type="password" onChange={chPassword} />
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control type="password" onChange={chCheckPassword} />
          <Button onClick={changePassword}>비밀번호 변경</Button>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
