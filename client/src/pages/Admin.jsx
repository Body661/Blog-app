import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Admin = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      return navigate("/login");
    }

    if (currentUser.role !== "admin") {
      navigate("/");
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://wezo-blog.herokuapp.com/api/admin`
        );
        setUsers(response.data);
      } catch (err) {
        // setErr(true);
        console.error(err);
      }
      // setLoading(false);
    };
    fetchUsers();
  }, [currentUser, navigate]);

  const handleChange = (newValue) => {
    const index = values.findIndex((value) => value.id === newValue.id);

    if (index === -1) {
      setValues((prevState) => [...prevState, { ...newValue }]);
    } else {
      values[index] = { ...values[index], ...newValue };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://wezo-blog.herokuapp.com/api/admin/`, values);
  };

  return (
    <div className="admin">
      <div className="users">
        <div className="header">
          <span className="img">Img</span>
          <span>ID</span>
          <span>Username</span>
          <span>Email</span>
          <span>Role</span>
        </div>
        <form action="">
          {users?.map((user) => (
            <div className="user" key={user.id}>
              <span>
                <img
                  src={`https://wezo-blog.herokuapp.com/uploads/${user.img}`}
                  alt="user img"
                />
              </span>
              <span>{user.id}</span>
              <input
                title={user.username}
                defaultValue={user.username}
                onChange={(e) =>
                  handleChange({ id: user.id, username: e.target.value })
                }
              />
              <input
                title={user.email}
                defaultValue={user.email}
                onChange={(e) =>
                  handleChange({ id: user.id, email: e.target.value })
                }
              />
              <select
                onChange={(e) => {
                  handleChange({ id: user.id, role: e.target.value });
                }}
                defaultValue={user.role}
              >
                <option value="writer">writer</option>
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </div>
          ))}
          {values.length > 0 && (
            <button onClick={handleSubmit}>SUBMIT CHANGES</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Admin;
