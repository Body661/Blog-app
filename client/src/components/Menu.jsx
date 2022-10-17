import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Menu({ cat, id }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `/posts/?category=${cat}`
        );
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [cat]);

  return (
    <div className="menu">
      <h2>Other articles you may like</h2>
      <div className="menu-posts">
        {posts?.map(
          (post) =>
            id !== post.id && (
              <div className="post" key={post.id}>
                <img src={`../uploads/${post.img}`} alt="" />
                <h3>{post.title}</h3>
                <button>
                  <Link to={`/post/${post.id}`} className="link">
                    Read More
                  </Link>
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Menu;
