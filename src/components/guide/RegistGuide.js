import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const RegistGuide = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate("");

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };
  const changeContent = (event) => {
    setContent(event.target.value);
  }
  const changePrice = (event) => {
    setPrice(event.target.value);
  }
  const changeAddress = (event) => {
    setAddress(event.target.value);
  }
  const mapRef = useRef(null);
  const lat = 35.8467508; // 위도
  const lng = 128.583211; // 경도

  const lat1 = 35.8472435;
  const lng1 = 128.5577828;

  useEffect(() => {
      const { naver } = window;
      if (mapRef.current && naver) {
          const location = new naver.maps.LatLng(lat, lng);
          const location1 = new naver.maps.LatLng(lat1, lng1);
          const map = new naver.maps.Map(mapRef.current, {
              center: location,
              zoom: 17, // 지도 확대 정도
          });
          new naver.maps.Marker({
              position: location,
              map,
          });
          new naver.maps.Marker({
            posigion: location1,
            map,
          });
      }
  }, []);
  
  const upload = () => {
    const data = {
      title:title,
      email:cookies.user,
      content:content,
      price:price,
    }

    fetch("http://localhost:8080/guide/regist",{
      method:"POST",
      headers:{
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
    .then((res) => res)
    .then((res)=>{
      if(res.status === 200){
        alert("등록되었습니다.");
        navigate("/Guide");
      }else{
        console.log("실패: "+res.error);
      }
    })
  }

  const handleGeocode = async () => {
    const clientId = '0h0avu08yx';  // 애플리케이션 등록 시 발급받은 client id값
    const clientSecret = 'sDQyBLGcv8054xLR7m4ZiXXgn4kjYuCHPTpqc1V2';  // 애플리케이션 등록 시 발급받은 client secret값
    const apiUrl = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode';

    try {
      const response = await fetch(`${apiUrl}?query=${encodeURIComponent(address)}`, {
        method: 'GET',
        headers: {
          'X-NCP-APIGW-API-KEY-ID': clientId,
          'X-NCP-APIGW-API-KEY': clientSecret,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Geocoding error:', error);
    }
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
          value={content}
          onChange={changeContent}
        />
        <Form.Label>루트</Form.Label>
        <Form.Control
          type="text" // 입력 필드 타입은 텍스트
          name="firstName" // 폼 필드의 이름
          value={address}
          onChange={changeAddress}
        />
        <Button onClick={handleGeocode} >추가</Button>
        {result}
        <div ref={mapRef} style={{ width: "500px", height: "500px" }}></div>
        <div></div>
        <Form.Label>가격</Form.Label>
        <Form.Control
          type="text" // 입력 필드 타입은 텍스트
          name="firstName" // 폼 필드의 이름
          value={price}
          onChange={changePrice}
        />
      </Form.Group>
      <Button onClick={upload}>등록</Button>
    </div>
  );
};

export default RegistGuide;

