import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Reservation = ({ guideId, toMember, fromMember }) => {
  const [text, setText] = useState("예약하기");
  const [status, setStatus] = useState();

  useEffect(() => {
    if (guideId) {
      // guideId가 유효한 값일 때만 fetch 호출
      fetch(`http://localhost:8080/guide/getGuide/${guideId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.reservation === 0) {
            setStatus(0);
            setText("예약하기");
          } else if (res.reservation === 1) {
            setStatus(1);
            setText("요청중");
          }
        });
    }
  }, [guideId]); // guideId가 변경될 때마다 useEffect 실행

  const reservation = () => {
    const data = {
      toMember: toMember,
      fromMember: fromMember,
      guideId: guideId,
    };
    if (status === 1) {
      return;
    }
    fetch(`http://localhost:8080/requestRes/${status}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          alert("요청 완료");
          setStatus(res.responseStatus);
          setText("요청중");
        }
      });
    console.log(data);
  };

  return (
    <div>
      <Button onClick={reservation}>{text}</Button>
    </div>
  );
};

export default Reservation;
