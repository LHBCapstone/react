import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import Reservation from "../../Reservation";

const DetailPage = () => {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [toMember, setToMember] = useState("");
  const [guideId, setGuideId] = useState("");
  const [fromMember, setFromMember] = useState("");
  const { id } = useParams();

  const [cookie] = useCookies(["user"]);
  useEffect(() => {
    fetch(`http://localhost:8080/guide/getGuide/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTitle(res.title);
        setWriter(res.member.name);
        setContent(res.content);
        setPrice(res.price);
        setToMember(res.member.email);
      });
    setGuideId(id);
    setFromMember(cookie.user);
  }, []);
  return (
    <div>
      <h1>{title}</h1>
      <h2>{writer}</h2>
      <h3>{content}</h3>
      <h4>{price}</h4>
      <Link to={`/message/${toMember}`}>
        <Button>메세지 보내기</Button>
      </Link>
      <Reservation
        guideId={guideId}
        toMember={toMember}
        fromMember={fromMember}
      />
    </div>
  );
};

export default DetailPage;
