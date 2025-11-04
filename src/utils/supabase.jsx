import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export function deletePostByID(id, funcAfterDeleted) {
  async function del() {
    const { data, error } = await supabase
      .from("posts")
      .delete("*")
      .eq("id", Number(id))
      .single();
    funcAfterDeleted(data, error);
  }
  const result = confirm(`id [${id}]를 삭제 할까요?`);
  if (result) del();
}

export async function getPostByID(id, setItem) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", Number(id))
    .single();

  setItem(data);
  console.log("getPost() data", data);
}

export default supabase;
