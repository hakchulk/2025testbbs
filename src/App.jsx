import { useState, useEffect } from "react";
import MenuComp from "./components/layout/MenuComp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComp from "./components/pages/home/HomeComp";
import AboutComp from "./components/pages/about/AboutComp";
import BoardComp from "./components/pages/board/BoardComp";

function App() {
  return (
    <BrowserRouter>
      <MenuComp></MenuComp>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route path="/about/*" element={<AboutComp />}></Route>
          <Route path="/board/*" element={<BoardComp />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
