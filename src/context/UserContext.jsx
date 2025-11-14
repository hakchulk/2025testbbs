import { createContext, useEffect, useState, useContext } from "react";
import supabase from "../utils/supabase";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UContext = createContext();

export function useUser() {
  const ret = useContext(UContext);
  if (!ret) throw new Error("이 훅은 UserProvider 안에 사용 해야 합니다.");
  return ret;
}

async function insertUser(formData, id) {
  const { data, error } = await supabase
    .from("user_table")
    .insert([
      {
        id: id,
        name: formData.username,
        text: formData.usertext,
        phone: formData.userphone,
      },
    ])
    .select();
  return { error };
}

async function fetchUser(id) {
  const { data, error } = await supabase
    .from("user_table")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export function UserProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const valContext = { user, setUser, signUp, signIn, signOut };

  async function loadUser() {
    const { data, error } = await supabase.auth.getSession();
    console.log("UserProvider() loadUser() data:", data);
    // console.log("UserProvider() loadUser() error:", error);

    // 만약 data가 null 또는 undefined라면, data?.session은 undefined를 반환.
    const session = data?.session ?? null;
    console.log("UserProvider() loadUser() session?.user:", session?.user);
    if (session?.user) {
      const extra = await fetchUser(session.user.id);
      const user = { ...session.user, ...extra };
      console.log("UserProvider() loadUser() user:", user);
      setUser(user);
      // console.log("UserProvider() loadUser() extra:", extra);
    }
  }

  async function setOnAuthStateChange() {
    const { data: sub } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(
          "UserProvider() setOnAuthStateChange() onAuthStateChange() session:",
          session
        );

        if (session?.user) {
          let user = session.user;
          console.log(
            "UserProvider() setOnAuthStateChange() onAuthStateChange() 1 user:",
            user
          );
          const extra = await fetchUser(user.id);
          user = { ...user, ...extra };
          setUser(user);
          console.log(
            "UserProvider() setOnAuthStateChange() onAuthStateChange() 2 user:",
            user
          );
        }
      }
    );

    return sub;
  }

  async function init() {
    await loadUser();
    return await setOnAuthStateChange();
  }

  useEffect(() => {
    const sub = init();

    return () => {
      console.log("UserProvider() useEffect() return() sub:", sub);
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  async function signUp(formData) {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.useremail,
      password: formData.userpwd,
    });
    // console.log("confirm() signUpError:", signUpError);
    // console.log("confirm() data:", data);

    if (signUpError) return { error: signUpError };

    if (!signUpError) {
      console.log("confirm() data:", data.user.id);
      const { userError } = await insertUser(formData, data.user.id);
      console.log("confirm() userError:", userError);
      if (!userError) {
        // await loadUser();
      } else return { error: userError };
    }

    return { error: null };
  }

  async function signIn(formData) {
    console.log("UserProvider() signIn()");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.useremail,
      password: formData.userpwd,
    });
    // console.log("UserProvider() signIn() data,error", data, error);
    if (!error) {
      //await loadUser();
    }
    return { error };
  }

  async function signOut() {
    const { data, error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
    } else {
      navigate("/");
    }
    return { error };
  }

  return <UContext.Provider value={valContext}>{children}</UContext.Provider>;
}
