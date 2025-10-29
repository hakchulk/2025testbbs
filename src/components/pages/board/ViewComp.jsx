import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import supabase from "../../../utils/supabase";

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
      ViewComp
      <br />
      <h3>{item.title}</h3>
      <p>ID:{item.id}</p>
      <p>작성자:{item.name}</p>
      <p>{item.content}</p>
    </div>
  );
}

export default ViewComp;
