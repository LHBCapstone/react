import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { Card } from "react-bootstrap";

const SimpleNaverMap = () => {
  const mapRef = useRef(null);
  const [markerRefs, setMarkerRefs] = useState([]);
  const [map, setMap] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/posts/guides"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("포스트 불러오기 에러:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const initializeMap = () => {
      const { naver } = window;
      if (mapRef.current && naver) {
        const initialLocation = new naver.maps.LatLng(35.8467508, 128.583211);
        const mapInstance = new naver.maps.Map(mapRef.current, {
          center: initialLocation,
          zoom: 10,
        });
        setMap(mapInstance);
      }
    };

    initializeMap();
  }, []);

  const handlePostClick = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/locations/posts/${postId}/locations`
      );
      const locations = response.data;
      if (locations.length > 0 && map) {
        const clickedPost = posts.find((post) => post.id === postId);
        setSelectedPost(clickedPost);
        setShowModal(true);
        markerRefs.forEach((marker) => marker.setMap(null));
        const newMarkerRefs = locations.map((location) => {
          const position = new window.naver.maps.LatLng(
            location.lat,
            location.lng
          );
          const marker = new window.naver.maps.Marker({
            position: position,
            map: map,
          });
          window.naver.maps.Event.addListener(marker, "click", () => {
            navigate(`/Modal/${postId}`);
          });
          return marker;
        });
        setMarkerRefs(newMarkerRefs);
      }
    } catch (error) {
      console.error("게시물 위치 불러오기 에러:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <div ref={mapRef} style={{ flex: 1, height: "100vh" }}></div>
      <div
        style={{
          flex: 1,
          height: "100vh",
          overflowY: "scroll",
          padding: "20px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          대구광역시 관광추천 루트
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {posts.map((post) => (
            <Card
              key={post.id}
              style={{
                cursor: "pointer",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                overflow: "hidden",
              }}
              onClick={() => handlePostClick(post.id)}
            >
              {post.imgSrc && (
                <Card.Img
                  variant="top"
                  src={post.imgSrc}
                  alt={post.title || "No title"}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title style={{ fontSize: "1.25rem" }}>
                  {post.title || "No title"}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      {selectedPost && showModal && (
        <Modal
          show={showModal}
          onClose={handleCloseModal}
          title={selectedPost.title}
          content={selectedPost.content}
          imgSrc={selectedPost.imgSrc}
          course={selectedPost.course}
          course_dt={selectedPost.course_dt}
        />
      )}
    </div>
  );
};

export default SimpleNaverMap;
