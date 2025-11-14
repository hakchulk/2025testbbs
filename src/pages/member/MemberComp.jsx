import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import SignInComp from "./SignInComp";
import SignUpComp from "./SignUpComp";

function MemberComp() {
  return (
    <div className="cotainer" style={{ minHeight: "400px" }}>
      <h3>회원</h3>
      <div className="d-flex gap-3">
        <Link to="../member/signin">로그인</Link>
        <Link to="../member/signup">회원가입</Link>
      </div>
      <Routes>
        <Route index element={<SignInComp></SignInComp>}></Route>
        <Route path="signin" element={<SignInComp></SignInComp>}></Route>
        <Route path="signup" element={<SignUpComp></SignUpComp>}></Route>
      </Routes>
    </div>
  );
}

export default MemberComp;
