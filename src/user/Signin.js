import React, { useState } from "react";
import Template from "../coreUI/Template";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";

export default function Signin() {
  const [values, setValues] = useState({
    name: "",
    email: "phat@gmail.com",
    password: "12345",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });

  const { name, email, password, error, success, loading, didRedirect } =
    values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.token) {
          //let sessionToken = data.token;
          authenticate(data, () => {
            console.log("token added");
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to='/' />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className='alert alert-info'>
          <h2>...Loading</h2>
        </div>
      )
    );
  };

  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-success'
            style={{ display: success ? "" : "none" }}
          >
            Login Successfully
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-danger'
            style={{ display: error ? "" : "none" }}
          >
            Invalid input
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='form-group'>
              <label>Email</label>
              <input
                type='text'
                className='form-control'
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                className='form-control'
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <button className='btn btn-dark btn-block' onClick={onSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Template title='Sign in' description='Welcome to sign in page'>
      {successMessage()}
      {errorMessage()}
      {loadingMessage()}
      {signInForm()}
      {performRedirect()}
    </Template>
  );
}
