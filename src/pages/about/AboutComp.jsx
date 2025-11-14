import React, { useEffect } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import ComComp from "./ComComp";
import HistoryComp from "./HistoryComp";
import ImageComp from "./ImageComp";
import { useUser } from "../../context/UserContext";
function AboutComp() {
  const { user } = useUser();
  useEffect(() => {
    // document.getElementById("companyFirst").classList.add("active");
  });
  return (
    <div className="container">
      <p>{`id:${user.username}`}</p>
      <div
        style={{ width: "100%", height: "200px" }}
        className="d-flex justify-content-center align-items-center bg-info rounded"
      >
        About
      </div>
      <div className="d-flex justify-content-center gap-3 submenu">
        <NavLink to="../about/company" className="nav-link" id="companyFirst">
          회사소개
        </NavLink>
        <NavLink to="../about/history" className="nav-link">
          연혁
        </NavLink>
        <NavLink to="../about/image" className="nav-link">
          image
        </NavLink>
      </div>
      <Routes>
        <Route index element={<ComComp />}></Route>
        <Route path="company" element={<ComComp />}></Route>
        <Route path="history" element={<HistoryComp />}></Route>
        <Route path="Image" element={<ImageComp />}></Route>
      </Routes>
    </div>
  );
}

export default AboutComp;
