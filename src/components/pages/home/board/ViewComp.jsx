import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

function ViewComp() {
  //  /board/1
  //const { id, writer, title, content, date } = useParams();
  const post = useParams();
  const [searchParams] = useSearchParams();

  return;
  <div>
    {post.id} / {post.title} / {post.name} / {post.content} /
    {dayjs(post.created_at).format("YYYY-MM-DD HH:mm:ss")}
  </div>;
}

export default ViewComp;
