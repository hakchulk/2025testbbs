import React, { useState } from "react";
import supabase from "../../utils/supabase";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

//////-----------------------
function SignInComp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userpwd: "",
    useremail: "",
  });

  const [errorM, setErrorM] = useState("");
  const { signIn } = useUser();

  function validation(formData) {
    if (formData.userpwd.length < 6) {
      return "비밀번호는 6자 이상이어야 합니다.";
    }

    return "";
  }

  const [loding, setLoading] = useState(false);

  function eventHandler(e) {
    const { name, value } = e.target;
    const newForm = { ...formData, [name]: value };
    setFormData(() => newForm);
    // console.log("eventHandler() formData:", formData);
    console.log("eventHandler() newForm:", newForm);
  }

  async function confirm(e) {
    e.preventDefault(); // 기본 이벤트(페이지 이동) 막기
    const errorm = validation(formData);
    setErrorM(errorm);
    if (errorm) return toast(errorm);

    console.log("confirm(e) errorm:" + errorm);
    setLoading(true);
    const { error } = await signIn(formData);
    setLoading(false);
    if (error) {
      toast(`로그인 에러 : ${error}`);
    } else {
      navigate("/");
    }
  }

  return (
    <div>
      <h3>로그인</h3>
      <hr />
      <div>{`error :${errorM}`}</div>
      <div>
        {/* onSubmit={(e) => {}} */}
        <form action="" onSubmit={confirm}>
          <div>
            <label htmlFor="useremail" className="form-label my-2">
              이메일
            </label>
            <input
              type="text"
              id="useremail"
              name="useremail"
              className="form-control my-2"
              onChange={(e) => eventHandler(e)}
              disabled={loding}
            />
          </div>

          <div>
            <label htmlFor="userpwd" className="form-label my-2">
              비밀번호
            </label>
            <input
              type="text"
              id="userpwd"
              name="userpwd"
              className="form-control my-2"
              onChange={(e) => eventHandler(e)}
              disabled={loding}
            />
          </div>

          <div>
            <button className="btn btn-primary" type="submit" disabled={loding}>
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInComp;
