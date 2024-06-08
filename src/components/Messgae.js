import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";

const Messgae = () => {
    const { to } = useParams();
    const [toUser, setToUser] = useState("");
    const [fromUser, setFromUser] = useState("");
    const [message, setMessage] = useState("");
    const [at, setAt] = useState("");  //대화 시간 
    const [list, setList] = useState([]);  //다른사람과의 대화 기록 
    const [talk, setTalk] = useState([]);  //대화내용
    const [cookie] = useCookies(["uuse"]);

    const changeMessage = (e) => {
        setMessage(e.target.value);
    }
    useEffect(()=>{
        fetch(`http://localhost:8080/getMessage/${cookie.user}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json; charset=utf-8",
            },
        }).then(res=>res.json())
        .then((res)=>{
            setTalk(res)
        })
    },[])
    const send = () => {
        const data = {
            content:message,
            toMember:{to}.to,
            fromMember:cookie.user,
        }
        console.log(data);
        fetch("http://localhost:8080/sendMessage",{
            method:"POST",
            headers:{
                "Content-Type": "application/json; charset=utf-8",
              },
              body: JSON.stringify(data),
        }).then((res)=>res.json())
        .then((res)=>{
            setAt(res.created_at);
        })
    }
    return(
        <div>
            {/* {list.map((list, index) => (
                <Link key={list.id} to={`/message/${toUser}/${fromUser}`}>
                <div key={index}>
                <h3>{list.message}</h3>
                </div>
                </Link>
            ))} */}
            {talk.map((talk,idx) => (
                <p>{talk.content} : {talk.created_at}</p>
            ))}
            <Form.Group controlId="validationFormik101" className="position-relative">
                <Form.Label></Form.Label>
                <Form.Control
                type="text" // 입력 필드 타입은 텍스트
                name="firstName" // 폼 필드의 이름
                value={message}
                onChange={changeMessage}
                />
            </Form.Group>
            <Button onClick={send}>보내기</Button>
        </div>
    )
}

export default Messgae;