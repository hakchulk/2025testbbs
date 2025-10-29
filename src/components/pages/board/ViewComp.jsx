import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import supabase from "../../../utils/supabase";
import dayjs from "dayjs";
function ViewComp() {
  const { num } = useParams();
  console.log("ViewComp() num", num);

  const [item, setItem] = useState({});

  useEffect(() => {
    async function getPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", Number(num))
        .single();

      setItem(data);
      console.log("ListComp() data", data);
    }

    getPosts();
  }, []);

  return (
    <div>
      <h3>{item.title}</h3>
      <p>{item.name}</p>
      <p className="small">
        {dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
      </p>
      <hr />
      <p>{item.content}</p>
      <div className="d-flex justify-content-end gap-3">
        <button className="btn btn-primary btn-sm">
          <Link to="../list" className="nav-link">
            목록으로
          </Link>
        </button>
      </div>
    </div>
  );
}

export default ViewComp;
