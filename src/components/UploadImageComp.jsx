import React, { useEffect, useRef, useState } from "react";
import supabase from "../utils/supabase";

const bucket = "images";
const tableName = "image_upload";
const imgUrlBase =
  "https://uncogyonzyahmxhernhq.supabase.co/storage/v1/object/public/" +
  bucket +
  "/";

export function getImageURL(filename) {
  if (!filename) return null;
  return imgUrlBase + filename;
}

export async function insertFileToDb(filename, fileurl) {
  const { data, error } = await supabase
    .from(tableName)
    .insert([
      {
        filename: filename,
        fileurl: fileurl,
      },
    ])
    .select("id");
  return { data, error };
}

export async function uploadFile(selectedFile) {
  var data, error;
  var filename = null;
  if (!selectedFile) {
    return { filename, error };
  }

  const selectedFilepath = `${Date.now()}_${selectedFile.name}`;
  //    const selectedFileName = encodeURIComponent(selectedFilepath);
  console.log("submitHandler() selectedFilepath:", selectedFilepath);
  // console.log("submitHandler() selectedFileName", selectedFileName);
  ({ data, error } = await supabase.storage
    .from(bucket)
    .upload(selectedFilepath, selectedFile));

  if (error) {
    console.log("submitHandler() supabase.storage error", error);
    return { data, error };
  }
  console.log("submitHandler() supabase.storage.upload data:", data);

  // ({ data, error } = supabase.storage
  //   .from(bucket)
  //   .getPublicUrl(selectedFilepath));

  // if (error) console.log("submitHandler() getPublicUrl() error", error);
  // console.log("submitHandler() supabase.storage.getPublicUrl() data:", data);

  ({ error } = await insertFileToDb(selectedFile.name, selectedFilepath)); //data.publicUrl
  if (error) console.log("submitHandler() insertDb() error", error);

  filename = selectedFilepath;
  return { filename, error };
}

///////////////////////////////////////////////////////////////////////
function UploadImageComp({ selectedFile, setSelectedFile, imageOrgUrl }) {
  console.log("UploadImageComp() imageOrgUrl:", imageOrgUrl);
  const [imageOrgUrlCopy, setImageOrgUrlCopy] = useState(null);
  useEffect(() => {
    console.log("UploadImageComp() useEffect() imageOrgUrl:", imageOrgUrl);
    // console.log("UploadImageComp() useEffect() imageOrgUrlCopy:", imageOrgUrlCopy);
    setImageOrgUrlCopy(imageOrgUrl); // 이전에 업로드된 파일의 URL
  }, [imageOrgUrl]);

  const fileInputRef = useRef(null);
  const [imgLocalUrl, setImgLocalUrl] = useState("");

  function fileChangeHandler(e) {
    const f = e.target.files[0];
    setSelectedFile(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setImgLocalUrl(url);
      console.log("fileChangeHandler() imgLocalUrl:", url);
    }
  }

  function deleteImg(e) {
    setImageOrgUrlCopy(null);
    console.log("deleteImg()");
    fileInputRef.current.value = "";
    setSelectedFile(null);
    if (imgLocalUrl) URL.revokeObjectURL(imgLocalUrl);
    setImgLocalUrl(null);
  }
  return (
    <>
      <div style={{ position: "relative" }}>
        <label
          htmlFor="photo"
          style={{ width: "100%", height: "50px" }}
          className="d-flex justify-content-center align-items-center bg-info rounded text-white"
        >
          {selectedFile ? selectedFile.name : "+"}
        </label>
        <input
          type="file"
          accept="image/*"
          id="photo"
          onChange={fileChangeHandler}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
            top: 0,
          }}
          ref={fileInputRef}
        />
      </div>
      <div>{imgLocalUrl || imageOrgUrlCopy || "이미지 없음"}</div>

      {(imgLocalUrl || imageOrgUrlCopy) && (
        <div
          className="position-relative rounded"
          style={{ width: "200px", height: "200px", overflow: "hidden" }}
        >
          <img
            src={imgLocalUrl || imageOrgUrlCopy || null}
            id="preView"
            // className="shadow rounded"
            style={{ width: "100%", height: "100%" }}
          />
          <div
            className="btn bg-white rounded btn-sm position-absolute end-0"
            onClick={deleteImg}
          >
            X
          </div>
        </div>
      )}
    </>
  );
}

export default UploadImageComp;
