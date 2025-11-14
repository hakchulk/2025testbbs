import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import supabase, {
  deletePostByID,
  getPostByID,
  getPostDataByID,
} from "../../utils/supabase";
import { PostContext } from "../../context/BoardContext";
import UploadImageComp, {
  uploadFile,
  getImageURL,
} from "../../components/UploadImageComp";

function ModifyComp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();
  console.log("ModifyComp() id", id);
  const [form, setForm] = useState({});
  useEffect(() => {
    console.log("ModifyComp() useEffect() start id:" + id);

    getPostByID(id, (postData) => {
      setForm(postData);
    });
  }, []);

  function deleteid(id, func) {
    deletePostByID(id, () => navigate("/board/list"));
  }

  const navigate = useNavigate();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  //-----------------------
  function eventHandler(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    validate({
      ...form,
      [e.target.name]: e.target.value,
    });
    // 이 방식은 마지막에 변경된 것만 처리 된다.
    // setForm({
    //   ...form,
    //   [e.target.name]: e.target.value,
    // });

    // setForm((prev) => {
    //   return { ...prev, [e.target.name]: e.target.value };
    // });
  }

  const [errors, setErrors] = useState({});

  //-----------------------
  // formData 를 사용 하지 않고 form를 사용 하면 안됨. async라서 문제 되는 것으로 추정
  function validate(formData) {
    console.log("validate(formData)", formData);

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
    setErrors(newError);
    setIsSubmitDisabled(Object.keys(newError).length === 0 ? false : true);
    console.log("formData", formData);
    console.log("newError", newError);
    console.log("isSubmitDisabled", isSubmitDisabled);

    return newError;
  }

  const { getPosts } = PostContext();
  //-----------------------
  function submitHandler(e) {
    async function update(formData) {
      const { filename, uploadFileError } = await uploadFile(selectedFile);
      if (uploadFileError) {
        console.log("submitHandler(e) uploadFileError", uploadFileError);
        return;
      }

      const { data, error } = await supabase
        .from("posts") // 1. Select the table
        .update({
          title: formData.title,
          name: formData.name,
          content: formData.content,
          image_file: filename,
        }) // 2. Set the new values
        .eq("id", id) // 3. Filter the row(s) to update
        .select(); // 4. (Optional) Return the updated row(s)
      getPosts();
      navigate("/board/list");
    }

    //-----------------------
    e.preventDefault(); // 기본 이벤트(페이지 이동) 막기

    if (Object.keys(errors).length === 0) {
      setIsSubmitDisabled(true);
      update(form);
    }
  }
  //-----------------------
  function deleteid(id, func) {
    deletePostByID(id, () => {
      getPosts();
      Navigate("/board/list");
    });
  }

  return (
    <div>
      <div className="container">
        <h3>수정[{form.id}]</h3>
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
                defaultValue={form.title}
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
                defaultValue={form.name}
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
                defaultValue={form.content}
              />
            </div>
            <UploadImageComp
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              imageOrgUrl={form.imageUrl}
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
              수정
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deleteid(form.id)}
            >
              삭제
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

export default ModifyComp;
