import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import supabase, { DeletePostID } from "../../../utils/supabase";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom"; // 1. useNavigate를 임포트

function ViewComp() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("ViewComp() id", id);

  const [item, setItem] = useState({});

  useEffect(() => {
    async function getPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", Number(id))
        .single();

      setItem(data);
      console.log("ListComp() data", data);
    }

    getPosts();
  }, []);

  function deleteid(id, func) {
    DeletePostID(id, () => navigate("/board/list"));
    // async function del() {
    //   const { data, error } = await supabase
    //     .from("posts")
    //     .delete("*")
    //     .eq("id", Number(id))
    //     .single();

    //   navigate("/board/list");
    // }
    // const result = confirm(`id [${id}]를 삭제 할까요?`);
    // if (result) del();
  }

  return (
    <div>
      <h3>글보기</h3>
      <hr />
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <h3>{item.title}</h3>
        <p className="small">
          {item.name} / {dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
      <div>
        <hr />
        {/* 버튼과 사이 띄우기 */}
        <p style={{ minHeight: "200px" }}>{item.content}</p>
      </div>
      <div className="d-flex justify-content-end gap-2">
        <Link to="/board/list" className="btn btn-info btn-sm">
          목록으로
        </Link>
        <Link to={`/board/modify/${item.id}`} className="btn btn-info btn-sm">
          수정
        </Link>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteid(item.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default ViewComp;
