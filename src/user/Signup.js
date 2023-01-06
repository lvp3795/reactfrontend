import React, { useState } from "react";
import Template from "../coreUI/Template";
import { Link } from "react-router-dom";
import { signup } from "../auth";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        console.log(data);
        if (data.email === email) {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        } else {
          setValues({
            ...values,
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-success'
            style={{ display: success ? "" : "none" }}
          >
            Account created successfully. <Link to='/signin'>Login now</Link>
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

  const signUpForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='form-group'>
              <label>Name</label>
              <input
                type='text'
                className='form-control'
                value={name}
                onChange={handleChange("name")}
              />
            </div>
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
    <Template title='Sign Up Page' description='Welcome to signup page'>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Template>
  );
}
