import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./member/Login";
import Join from "./member/Join";

import Guide from "./guide/Guide";
import Plan from "./Plan";
import Main from "./Main";
import Companion from "./Companion";
import Profile from "./member/Profile";
import RegistGuide from "./guide/RegistGuide";
import SimpleNaverMap from "./SimpleNaverMap";
import DetailPage from "./guide/DetailPage";
import Messgae from "./Messgae";
import MyPosts from "./MyPosts";
import Modal from "./Modal";
import Disgin from "./Disgin";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/SimpleNaverMap" element={<SimpleNaverMap />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/companion" element={<Companion />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/registGuide" element={<RegistGuide />} />
        <Route path="/detailPage/:id" element={<DetailPage />} />
        <Route path="/message" element={<Messgae />} />
        <Route path="/message/:to" element={<Messgae />} />
        <Route path="/message/:to/:guideId" element={<Messgae />} />
        <Route path="/myPosts" element={<MyPosts />} />

        <Route path="/simpleNaverMap" element={<SimpleNaverMap />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/component" element={<Disgin />} />
      </Routes>
    </div>
  );
}

export default Router;
