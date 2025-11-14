import React, { useState } from "react";
import supabase from "../../utils/supabase";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";

//////-----------------------
function SignUpComp() {
  const [formData, setFormData] = useState({
    username: "",
    userpwd: "",
    userpwd1: "",
    useremail: "",
    usertext: "",
    userphone: "",
  });

  const [errorM, setErrorM] = useState("");
  const { signUp } = useUser();

  function validation(formData) {
    if (formData.userpwd.length < 6) {
      return "비밀번호는 6자 이상이어야 합니다.";
    }
    if (formData.userpwd1.length < 6) {
      return "비밀번호확인도 6자 이상이어야 합니다.";
    }

    if (formData.userpwd != formData.userpwd1) {
      return "비밀번호가 일치하지 않습니다.";
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
    const { error } = await signUp(formData);
    if (error) {
      toast(`회원가입 에러 : ${error}`);
    }
    setLoading(false);
  }

  return (
    <div>
      <h3>회원가입</h3>
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
            <label htmlFor="userpwd1" className="form-label my-2">
              비밀번호 확인
            </label>
            <input
              type="text"
              id="userpwd1"
              name="userpwd1"
              className="form-control my-2"
              onChange={(e) => eventHandler(e)}
              disabled={loding}
            />
          </div>
          <hr />

          <div>
            <label htmlFor="username" className="form-label my-2">
              이름
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control my-2"
              onChange={(e) => eventHandler(e)}
              disabled={loding}
            />
          </div>
          <div>
            <label htmlFor="userphone" className="form-label my-2">
              전화번호
            </label>
            <input
              type="text"
              id="userphone"
              name="userphone"
              className="form-control my-2"
              onChange={(e) => eventHandler(e)}
              disabled={loding}
            />
          </div>

          <div>
            <label htmlFor="usertext" className="form-label my-2">
              비고
            </label>
            <input
              type="text"
              id="usertext"
              name="usertext"
              className="form-control my-2"
              onChange={(e) => eventHandler(e)}
              disabled={loding}
            />
          </div>
          <div>
            <button className="btn btn-primary" type="submit" disabled={loding}>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpComp;
