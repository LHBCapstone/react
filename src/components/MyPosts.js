import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
      .catch((error) => console.error("Error fetching posts:", error));
  }, [cookie.user]);

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  const responseReserve = (index) => {
    if (posts[index].reservation === 2) {
      return;
    }
    fetch(`http://localhost:8080/responseRes/${posts[index].guideId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  };
  const setBtnText = (key) => {
    if (posts[key].reservation === 1) {
      return "요청중";
    } else if (posts[key].reservation === 2) {
      return "예약확정";
    } else {
      return "예약하기"; // 예약확정과 요청중 외 다른 값에 대한 기본 텍스트
    }
  };

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          {post.reservation === 0 ? (
            <h6>{post.title}</h6>
          ) : (
            <h6>
              {post.title} ' '{post.fromMemberEmail} ' ' {post.reservation}
              <Button
                onClick={() => {
                  responseReserve(index);
                }}
              >
                {setBtnText(index)}
              </Button>
            </h6>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
