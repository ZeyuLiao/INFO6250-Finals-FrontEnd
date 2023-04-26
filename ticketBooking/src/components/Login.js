import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { api } from "../axios/api";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const [formData] = useState(initialValues);
  const navigate = useNavigate();
  const { setLoginUsername } = useContext(AppContext);

  const onSubmit = async (formData) => {
    // handle login logic here

    await api
      .post("/login", formData)
      .then((response) => {
        window.alert("Login successfully.");
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("username", response.data.username);
        sessionStorage.setItem("user", response.data);
        setLoginUsername(response.data.username);
        navigate(`/`);
      })
      .catch((error) => {
        window.alert("Login failed, Check your username and password.");
      });
  };

  return (
    <div className="p-5 pt-0">
      <h1>Login</h1>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="pt-4">
            <div className="form-group col-4">
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                name="username"
                className={`form-control ${
                  touched.username && errors.username ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group col-4 pt-3">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                name="password"
                className={`form-control ${
                  touched.password && errors.password ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="pt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
