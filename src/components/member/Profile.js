import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const chEmail = (event) => {
    setEmail(event.target.value);
  };
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
    fetch();
  });
  const changePassword = () => {};
  const changeName = () => {};
  return (
    <div>
      <div>
        <Form>
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} disabled onChange={chEmail} />
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
