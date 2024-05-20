import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./member/Login";
import Join from "./member/Login";
import Main from "./Main";
import Guide from "./Guide";
import Experience from "./Experience";
import Plan from "./Plan";
import Companion from "./Companion";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/companion" element={<Companion />} />
      </Routes>
    </div>
  );
}

export default Router;
