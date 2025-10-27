import React from "react";
import { useState, useEffect } from "react";
import supabase from "../../../../utils/supabase";
import dayjs from "dayjs";

import { useParams, useSearchParams } from "react-router-dom";

function ListComp() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const data = await supabase.from("posts").select();
      const { data: posts } = data;

      setPosts(posts);
      console.log(data);
    }

    getPosts();
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.id} / {post.title} / {post.name} / {post.content} /
            {dayjs(post.created_at).format("YYYY-MM-DD HH:mm:ss")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListComp;
