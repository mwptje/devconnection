import React, { Fragment, useState } from "react";
import axios from "axios";

const Register = () => {
  // set state hook and initialize fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  // destructure to get the actual fields
  const { name, email, password, password2 } = formData;
  // onChange merge formData with original and newly changed field
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // on submitting the form
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      // console.log(formData);
      const newUser = {
        name,
        email,
        password,
      };
      try {
        // create header for request
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        // convert newUser to valid json
        const body = JSON.stringify(newUser);
        // send using axios: path, body and config containing header
        const res = await axios.post("/api/users", body, config);
        // log the token that was received after registering a user
        console.log(res.data);
      } catch (err) {
        console.error(err.response.setFormData);
      }
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </Fragment>
  );
};

export default Register;
