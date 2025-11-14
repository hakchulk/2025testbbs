import React, { useState } from "react";
import supabase from "../../utils/supabase";
import UploadImageComp, { uploadFile } from "../../components/UploadImageComp";

function ImageComp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    if (!selectedFile) {
      setMessage("이미지를 선택하세요");
      return;
    }
    // const formData = new FormData();
    // formData.append("selectedFile", selectedFile);
    const { filename, error } = await uploadFile(selectedFile);
    if (error) setMessage("이미지를 upload 실패!");
    else setMessage(filename);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <UploadImageComp
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        ></UploadImageComp>

        <button className="btn btn-primary" type="submit">
          전송
        </button>
      </form>
      <div>{message && <p> {message} </p>}</div>
    </div>
  );
}

export default ImageComp;
