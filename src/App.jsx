import { useState, useEffect } from "react";
import MenuComp from "./layout/MenuComp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComp from "./pages/home/HomeComp";
import AboutComp from "./pages/about/AboutComp";
import BoardComp from "./pages/board/BoardComp";
import MemberComp from "./pages/member/MemberComp";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <MenuComp></MenuComp>
          <div className="container">
            <Routes>
              <Route path="/" element={<HomeComp />} />
              <Route path="/about/*" element={<AboutComp />}></Route>
              <Route path="/board/*" element={<BoardComp />}></Route>
              <Route path="/member/*" element={<MemberComp />}></Route>
            </Routes>
          </div>
        </UserProvider>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
export default App;
