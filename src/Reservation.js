import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Reservation = ({ guideId, toMember, fromMember }) => {
  const [text, setText] = useState("예약하기");

  const reservation = () => {
    const data = {
      toMember: toMember,
      fromMember: fromMember,
      id: guideId,
    };
    fetch("http://localhost:8080/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setText("예약완료");
        }
      });
  };
  return (
    <div>
      <Button onClick={reservation}>{text}</Button>
    </div>
  );
};

export default Reservation;
