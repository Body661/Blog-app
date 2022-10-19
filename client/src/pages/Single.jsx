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

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "white",
  boxShadow: "0px 0px 100px 0px hsl(336, 100%, 30%)",
  p: 4,
  outline: "none",
  borderRadius: 2,
};

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const id = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://wezo-blog.herokuapp.com/api/posts/${id}`
        );
        setPost(...response.data);
      } catch (err) {
        setLoading(false);
        setErr(true);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [id]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`https://wezo-blog.herokuapp.com/api/posts/${id}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      setLoading(false);
      setErr(true);
    }
  };

  return (
    <div className="single">
      {loading && (
        <div className="content">
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
        </div>
      )}

      {!loading && post ? (
        <div className="content">
          <img
            src={`https://wezo-blog.herokuapp.com/uploads/${post?.img}`}
            alt=""
          />
          <div className="user">
            <img
              className="user-img"
              src={`https://wezo-blog.herokuapp.com/uploads/${post?.userImg}`}
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
                <img onClick={handleOpen} src={Delete} alt="" />
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
      ) : (
        navigate("*")
      )}

      {!loading && !err && <Menu cat={post?.cat} id={post?.id} />}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to permanently delete this article?
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              style={{ color: "red" }}
            >
              Be aware, this action is irreversible!
              <div className="confirm">
                <Button onClick={handleClose}>CANCLE</Button>
                <Button style={{ color: "red" }} onClick={handleDelete}>
                  DELETE
                </Button>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Single;
