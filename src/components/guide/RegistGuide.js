import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const RegistGuide = () => {
  const [title, setTitle] = useState("");
  const changeTitle = (event) => {
    setTitle(event.target.value);
  };
  return (
    <div>
      <h1>가이드 등록</h1>
      {/* 
            제목
            작성자  => 지금까지 올린 목록
            루트   =>  지도에 마커로 표시
            내용  =>  사진 등록 가능
            가격  =>  
        */}
      <Form.Group controlId="validationFormik101" className="position-relative">
        <Form.Label>제목</Form.Label>
        <Form.Control
          type="text" // 입력 필드 타입은 텍스트
          name="firstName" // 폼 필드의 이름
          value={title}
          onChange={changeTitle}
        />
        <Form.Label>내용</Form.Label>
        <Form.Control
          type="text" // 입력 필드 타입은 텍스트
          name="firstName" // 폼 필드의 이름
          value={title}
          onChange={changeTitle}
        />
        <Form.Label>루트</Form.Label>
        <Form.Control
          type="text" // 입력 필드 타입은 텍스트
          name="firstName" // 폼 필드의 이름
          value={title}
          onChange={changeTitle}
        />
        <Form.Label>가격</Form.Label>
        <Form.Control
          type="text" // 입력 필드 타입은 텍스트
          name="firstName" // 폼 필드의 이름
          value={title}
          onChange={changeTitle}
        />
      </Form.Group>
      <Button>등록</Button>
    </div>
  );
};

export default RegistGuide;
