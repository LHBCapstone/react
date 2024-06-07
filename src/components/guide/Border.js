import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Border = () => {
  return (
    <div>
      <Link className="toRegistGuide" to="/registGuide">
        <Button>가이드 등록</Button>
        <div>가이드 1</div>
        <div>가이드 1</div>
        <div>가이드 1</div>
        <div>가이드 1</div>
        <div>가이드 1</div>
        <div>가이드 1</div>

        <div>가이드 1</div>
        <div>가이드 1</div>
        <div>가이드 1</div>
        <div>가이드 1</div>
      </Link>
    </div>
  );
};

export default Border;
