import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import Delete from "../imgs/delete.png";
import Edit from "../imgs/edit.png";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { TailSpin } from "react-loader-spinner";

import DOMPurify from "dompurify";

const getText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent;
};

const Single = () => {
  const [post, setPost] = useState({});
  const [err, setErr] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { currentUser } = useContext(AuthContext);

  const id = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://wezo-blog.herokuapp.com/api/posts/${id}`
        );
        setPost(...response.data);
        setLoading(false);
      } catch (err) {
        setErr(true);
      }
    };

    fetchPosts();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://wezo-blog.herokuapp.com/api/posts/${id}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="single">
      {loading && (
        <TailSpin
          height="80"
          width="80"
          color="#e50056"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{
            position: "absolute",
            left: "50%",
            transform: "translate-x(-50%)",
          }}
          visible={true}
        />
      )}
      <div className="content">
        <img
          src={`https://wezo-blog.herokuapp.com/api/uploads/${post?.img}`}
          alt=""
        />
        <div className="user">
          <img
            className="user-img"
            src={`https://wezo-blog.herokuapp.com/api/uploads/${post?.userImg}`}
            alt=""
          />
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser?.email === post?.email && (
            <div className="edit">
              <Link to={`/write?edit=${post.id}`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post?.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></p>
      </div>
      <Menu cat={post?.cat} id={post?.id} />
    </div>
  );
};

export default Single;
