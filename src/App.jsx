import { useState, useEffect } from "react";
import supabase from "./utils/supabase";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const { data: posts } = await supabase.from("posts").select();

      setPosts(posts);
      console.log(posts);
    }

    getPosts();
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.id} / {post.title} / {post.name} / {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
