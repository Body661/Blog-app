import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const getText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent;
};

function Home() {
  const [posts, setPosts] = useState([]);
  const category = useLocation().search;
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_END_API}posts${category}`
        );
        setPosts(response.data);
      } catch (err) {
        setErr(true);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [category]);

  return (
    <div className="home">
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
      <div className="posts">
        {posts.length > 0 &&
          posts?.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img
                  src={`${process.env.REACT_APP_BACK_END_API}uploads/${post.img}`}
                  alt=""
                />
              </div>
              <div className="content">
                <Link to={`/post/${post.id}`} className="link">
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.desc)}</p>
                <button>
                  <Link to={`/post/${post.id}`} className="link">
                    Read More
                  </Link>
                </button>
              </div>
            </div>
          ))}

        {!loading && posts.length === 0 && !err && (
          <p className="not-found">No Posts Yet !</p>
        )}
        {!loading && posts.length === 0 && err && (
          <p className="not-found" style={{ color: "red" }}>
            Something Went Wrong!
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
