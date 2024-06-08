import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


const Guide = () => {
  const navigate = useNavigate("");
  const [cookies] = useCookies(["user"]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/guide/getGuides",{
      method:"GET",
      headers:{
        "Content-Type": "application/json; charset=utf-8",
      }
    }).then((res)=>res.json())
    .then((res)=>{
      setPosts(res);
    })
  },[])
  const toRegist = () => {
    if(!cookies.user){
      alert("로그인 해주세요");
      navigate("/login");
    }else{
      navigate("/registGuide")
    }
  }
  return (
    <div>
      {posts.map((guide, index) => (
        <Link key={guide.id} to={`/detailPage/${guide.id}`}>
        <div key={index}>
          <h3>{guide.title}</h3>
          <p>{guide.content}</p>
        </div>
        </Link>
      ))}
      <Button onClick={toRegist}>
          가이드 등록
      </Button>
    </div>
  );
};

export default Guide;
