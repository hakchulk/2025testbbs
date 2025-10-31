import React from "react";
import { useState, useEffect } from "react";
import supabase, { DeletePostID } from "../../../utils/supabase";
import dayjs from "dayjs";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

function ListComp() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const { data } = await supabase
      .from("posts")
      .select()
      .order("id", { ascending: false });
    // const { data: posts } = data;

    setPosts(data);
    console.log("ListComp() data", data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  function deleteid(id) {
    DeletePostID(id, () => getPosts());
  }

  return (
    <div>
      {/* {posts.map((post, i) => (
          <li key={post.id}>
            <Link to={"../board/view/" + post.id} className="nav-link">
              {post.id} / {post.title} / {post.name} / {post.content} /
              {dayjs(post.created_at).format("YYYY-MM-DD HH:mm:ss")}
            </Link>
          </li>
        ))} */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Writer</th>
            <th scope="col">Created At</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">
                  <Link
                    className="link-secondary text-decoration-none"
                    to={"/board/view/" + item.id}
                  >
                    {item.id}
                  </Link>
                </th>
                <td>
                  <Link
                    className="link-secondary text-decoration-none"
                    to={"/board/view/" + item.id}
                  >
                    {item.title}
                  </Link>
                </td>
                <td>{item.name}</td>
                <td>{dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteid(item.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-end">
        <Link to="/board/write" className="btn btn-secondary btn-sm text-end">
          글작성
        </Link>
      </div>
    </div>
  );
}

export default ListComp;
