import { useState, useEffect } from "react";
import MenuComp from "./components/layout/MenuComp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComp from "./components/pages/home/HomeComp";
import ListComp from "./components/pages/home/board/ListComp";
import AboutComp from "./components/pages/home/AboutComp";

function App() {
  return (
    <BrowserRouter>
      <MenuComp></MenuComp>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route path="/list" element={<ListComp />} />
          <Route path="/home/about" element={<AboutComp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
