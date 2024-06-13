import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Reservation = ({ guideId, toMember, fromMember }) => {
  const [text, setText] = useState("예약하기");
  const [status, setStatus] = useState();

  useEffect(() => {
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
  }, [status]);

  const reservation = () => {
    const data = {
      toMember: toMember,
      fromMember: fromMember,
      guideId: guideId,
    };
    fetch(`http://localhost:8080/requestRes/${status}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res === 0) {
          setStatus(0);
          setText("요청중");
        } else if (res === 1) {
          setStatus(1);
          setText("예약하기");
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
