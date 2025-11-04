import { createContext, useEffect, useState, useContext } from "react";
import supabase from "../utils/supabase";

const UserContext = createContext();
export function PostContext() {
  const ret = useContext(UserContext);
  if (!ret) throw new Error("이 훅은 UserProviderComp 안에 사용 해야 합니다.");
  return ret;
}
export function BoardProviderComp({ children }) {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const { data } = await supabase
      .from("posts")
      .select()
      .order("id", { ascending: false });

    setPosts(data);
    console.log("ListComp() data", data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <UserContext.Provider value={{ posts, getPosts }}>
      {children}
    </UserContext.Provider>
  );
}

// export const UserProvider = ({ children }) => {
//   return <UserContext.Provider value="홍길동">{children}</UserContext.Provider>;
// };
