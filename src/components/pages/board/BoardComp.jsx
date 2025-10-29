import { Link, Route, Routes } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import ListComp from "./ListComp";
import WriteComp from "./WriteComp";
import ViewComp from "./ViewComp";
import ModifyComp from "./ModifyComp";
import { useEffect, useState } from "react";

function BoardComp() {
  // //  /board/1
  // const { id } = useParams();
  // const { name1, age1 } = useParams();
  // const [searchParams] = useSearchParams();
  // // board?name=hak
  // const name = searchParams.get("name");
  // const age = searchParams.get("age");
  return (
    <div className="container">
      <div className="d-flex justify-content-center gap-3 submenu">
        <Link to="../board/list" className="nav-link">
          목록
        </Link>
        <Link to="../board/write" className="nav-link">
          글작성
        </Link>
      </div>
      <Routes>
        <Route index element={<ListComp />}></Route>
        <Route path="list" element={<ListComp />}></Route>
        <Route path="write" element={<WriteComp />}></Route>
        <Route path="view/:num" element={<ViewComp />}></Route>
        <Route path="modify/:id" element={<ModifyComp />}></Route>
      </Routes>
    </div>
  );
}

export default BoardComp;
