import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { deletePostByID } from "../../utils/supabase";
import { PostContext } from "../../context/BoardContext";
import { useEffect } from "react";

function ListComp() {
  const { posts, getPosts } = PostContext();
  function deleteid(id) {
    deletePostByID(id, () => getPosts());
  }

  // useEffect(() => {
  //   getPosts();
  // }, []);

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
            <th scope="col" style={{ width: "60%" }}>
              Title
            </th>
            <th scope="col">Writer</th>
            <th scope="col" style={{ width: "11rem" }}>
              Created At
            </th>
            <th scope="col">수정</th>
            <th scope="col">삭제</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((item) => {
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
                  <Link
                    className="btn btn-primary btn-sm"
                    to={`/board/modify/${item.id}`}
                  >
                    수정
                  </Link>
                </td>
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
