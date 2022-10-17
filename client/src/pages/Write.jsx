import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

const Write = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [desc, setDesc] = useState(state?.desc || "");
  const [content, setContent] = useState(state?.content || "");
  const [cat, setCat] = useState(state?.cat || "");
  const [defaultImg, setImg] = useState(state?.img || "");
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      return navigate("/login");
    }
  }, [currentUser, navigate]);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "https://wezo-blog.herokuapp.com/api/upload",
        formData
      );
      return res.data;
    } catch (err) {
      setErr(err.message);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    let img;

    if (file) img = await upload();

    try {
      if (state) {
        await axios.put(
          `https://wezo-blog.herokuapp.com/api/posts/${state.id}`,
          {
            title,
            desc,
            content,
            cat,
            img: file ? img : defaultImg,
          },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `https://wezo-blog.herokuapp.com/api/posts/`,
          {
            title,
            desc,
            content,
            cat,
            img: file ? img : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          },
          { withCredentials: true }
        );
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        {loading && (
          <TailSpin
            height="80"
            width="80"
            color="#e50056"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{
              margin: "auto",
            }}
            visible={true}
          />
        )}
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "tech"}
              name="cat"
              value="tech"
              id="tech"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="tech">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
        <div className="item">
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <button onClick={handleClick}>Publish</button>
        </div>
      </div>
    </div>
  );
};

export default Write;
