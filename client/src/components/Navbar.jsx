import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../imgs/logo-no-background.png";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import menu from "../imgs/menu.png";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [show, setShow] = useState(true);

  function getWindowSize() {
    const { innerWidth } = window;
    return { innerWidth };
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const setMenu = () => {
      if (windowSize.innerWidth < 1110) {
        setShow(false);
      } else {
        setShow(true);
      }
    };

    setMenu();
  }, [windowSize.innerWidth]);

  const onClickHandler = () => {
    if (windowSize.innerWidth < 1110) {
      setShow(false);
    }
  };

  return (
    <div className="nav">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div
          className="links"
          style={{
            display: show ? "flex" : "none",
          }}
        >
          <Link className="link" to="/?category=art" onClick={onClickHandler}>
            <h6>ART</h6>
          </Link>
          <Link
            className="link"
            to="/?category=science"
            onClick={onClickHandler}
          >
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?category=tech" onClick={onClickHandler}>
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link
            className="link"
            to="/?category=cinema"
            onClick={onClickHandler}
          >
            <h6>CINEMA</h6>
          </Link>
          <Link
            className="link"
            to="/?category=design"
            onClick={onClickHandler}
          >
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?category=food" onClick={onClickHandler}>
            <h6>FOOD</h6>
          </Link>
          {currentUser?.username && <span>{currentUser?.username}</span>}
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <span className="write">
              <Link className="link" to="/login">
                Login
              </Link>
            </span>
          )}
          {currentUser &&
            (currentUser.role === "writer" || currentUser.role === "admin") && (
              <span className="write">
                <Link className="link" to="/write" onClick={onClickHandler}>
                  Write
                </Link>
              </span>
            )}
        </div>
        {windowSize.innerWidth < 1110 && (
          <img
            src={menu}
            alt=""
            className="menu-icon"
            onClick={() => {
              setShow(!show);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
