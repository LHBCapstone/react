import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useCookies } from "react-cookie";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [cookie] = useCookies(["user"]);

  useEffect(() => {
    fetch(`http://localhost:8080/getPosts/${cookie.user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPosts(res);
      })
      .catch((error) => console.error("포스트 불러오기 에러:", error));
  }, [cookie.user]);

  const responseReserve = (index) => {
    const currentStatus = posts[index].reservation;
    const newStatus = currentStatus === 1 ? 2 : 1; // 현재 상태가 요청 중이면 확정으로, 확정 상태면 요청 중으로 변경

    fetch(`http://localhost:8080/responseRes/${posts[index].guideId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then(() => {
        // 상태 업데이트를 통해 재 렌더링을 유도
        const updatedPosts = [...posts];
        updatedPosts[index].reservation = newStatus;
        setPosts(updatedPosts);
      })
      .catch((error) => console.error("예약 요청 에러:", error));
  };

  const getStatusText = (status) => {
    if (status === 1) {
      return "요청 중";
    } else if (status === 2) {
      return "예약 확정";
    } else {
      return "예약 가능";
    }
  };

  const getStatusVariant = (status) => {
    if (status === 1) {
      return "warning";
    } else if (status === 2) {
      return "success";
    } else {
      return "primary";
    }
  };

  return (
    <div>
      {posts.map((post, index) => (
        <Card key={index} className="my-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {post.fromMemberEmail}
            </Card.Subtitle>
            <Card.Text>상태: {getStatusText(post.reservation)}</Card.Text>
            {post.reservation === 0 && (
              <Button variant="primary" onClick={() => responseReserve(index)}>
                예약하기
              </Button>
            )}
            {post.reservation === 1 && (
              <Button variant="warning" onClick={() => responseReserve(index)}>
                요청 중
              </Button>
            )}
            {post.reservation === 2 && (
              <Button variant="success" disabled>
                예약 확정
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MyPosts;
