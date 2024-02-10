import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../adduser/add.css";
import toast from "react-hot-toast";

const Edit = () => {
  const users = {
    name: "",
    mobile: "",
    address: "",
    city: "",
    email: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(users);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/users/update/${id}`, user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Update user</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">name</label>
          <input
            type="text"
            // by default value lakhaine  aavi jaay edit ma
            value={user.name}
            onChange={inputChangeHandler}
            id="name"
            name="name"
            autoComplete="off"
            placeholder="First name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="mobile">Mobile no</label>
          <input
            type="text"
            value={user.mobile}
            onChange={inputChangeHandler}
            id="mobile"
            name="mobile"
            autoComplete="off"
            placeholder="mobile no"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            value={user.address}
            onChange={inputChangeHandler}
            id="address"
            name="address"
            autoComplete="off"
            placeholder="address"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="city">City</label>
          <input
            type="text"
            value={user.city}
            onChange={inputChangeHandler}
            id="city"
            name="city"
            autoComplete="off"
            placeholder="city"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={inputChangeHandler}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>

        <div className="inputGroup">
          <button type="submit">UPDATE USER</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
