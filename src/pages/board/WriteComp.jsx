import React, { useState } from "react";
import supabase from "../../utils/supabase";
import { Link, Navigate, useNavigate } from "react-router-dom"; // 1. useNavigate를 임포트
import { PostContext } from "../../context/BoardContext";
import { useUser } from "../../context/UserContext";
import UploadImageComp, { uploadFile } from "../../components/UploadImageComp";
//////-----------------------
function WriteComp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useUser();
  if (!user) return;

  const navigate = useNavigate();
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);

  const [form, setForm] = React.useState({
    name: "",
    title: "",
    content: "",
  });

  //-----------------------
  function eventHandler(e) {
    const { name, value } = e.target;
    const newForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(newForm);
    setErrors(validate(newForm));
  }

  const [errors, setErrors] = React.useState({});

  //-----------------------
  // formData 를 사용 하지 않고 form를 사용 하면 안됨. async라서 문제 되는 것으로 추정
  function validate(formData) {
    const newError = {};

    if (formData.name.trim() === "") {
      newError.name = "이름을 입력하세요";
    }

    if (formData.title.trim() === "") {
      newError.title = "제목를 입력하세요";
    } else if (formData.title.length < 4) {
      newError.title = "제목는 4자 이상 입력하세요";
    }

    if (formData.content.trim() === "") {
      newError.content = "내용을 입력하세요";
    }

    setIsSubmitDisabled(Object.keys(newError).length === 0 ? false : true);
    console.log("formData", formData);
    console.log("isSubmitDisabled", isSubmitDisabled);

    return newError;
  }

  const { getPosts } = PostContext();

  //-----------------------
  function submitHandler(e) {
    async function write(formData) {
      const { filename, uploadFileError } = await uploadFile(selectedFile);
      if (uploadFileError) {
        console.log("submitHandler(e) uploadFileError", uploadFileError);
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            title: formData.title,
            name: formData.name,
            content: formData.content,
            user_id: user.id,
            image_file: filename,
          },
        ])
        .select();
      getPosts();
      navigate("/board/list");
    }

    //-----------------------
    e.preventDefault(); // 기본 이벤트(페이지 이동) 막기

    if (Object.keys(errors).length === 0) {
      setIsSubmitDisabled(true);
      write(form);
    }
  }

  //-----------------------
  return (
    <div>
      <div className="container">
        <h3>글작성</h3>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <div className="d-flex flex-column flex-md-row">
              {/* html : for, react : htmlFor */}
              <label
                htmlFor="title"
                className="form-lable"
                style={{ width: "100px" }}
              >
                제목*
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={eventHandler}
                placeholder="타이틀 입력"
              />
            </div>
            {errors.title && (
              <div className="form-text" style={{ color: "red" }}>
                {errors.title}
              </div>
            )}
          </div>
          <div className="mb-3">
            <div className="d-flex flex-column flex-md-row">
              {/* html : for, react : htmlFor */}
              <label
                htmlFor="name"
                className="form-label"
                style={{ width: "100px" }}
              >
                이름*
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={eventHandler}
                placeholder="이름 입력"
                defaultValue={user.name}
              />
            </div>

            {errors.name && (
              <div className="form-text" style={{ color: "red" }}>
                {errors.name}
              </div>
            )}
          </div>
          <div className="mb-3">
            <div className="d-flex flex-column flex-md-row">
              {/* html : for, react : htmlFor */}
              <label
                htmlFor="content"
                className="form-lable"
                style={{ width: "100px" }}
              >
                내용*
              </label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                onChange={eventHandler}
                style={{ minHeight: "100px" }}
                placeholder="내용 입력"
              />
            </div>
            <UploadImageComp
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            ></UploadImageComp>
            {errors.content && (
              <div className="form-text" style={{ color: "red" }}>
                {errors.content}
              </div>
            )}
          </div>

          {/* <button> 은 text로 취급 하기 떄문에 text-end가능 */}
          <div className="d-flex justify-content-end gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitDisabled}
            >
              글작성
            </button>

            <Link className="btn btn-warning" to="/board/list">
              취소
            </Link>
          </div>
        </form>
      </div>
      {/* <div>formData / {JSON.stringify(form)} </div> */}
      <div>errors / {Object.keys(errors).length === 0 ? "false" : "true"}</div>
    </div>
  );
}

export default WriteComp;
