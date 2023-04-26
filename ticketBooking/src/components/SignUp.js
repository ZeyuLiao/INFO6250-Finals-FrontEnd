import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import {api} from '../axios/api';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^\d{10}$/).required(),
  username: yup.string().required(),
  password: yup.string().required().min(6),
});

function Signup() {
  const [formData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // handle form submission
    try {
      const response = await api.post("/user/signup", values);
      if(response.data === "Duplicate Username"){
        alert("Username already exists");
        return;
      }
      //setResponse(response.data);
      navigate('/login');
    } catch (error) {
      alert("Email already exists");
      console.log(error);
    }
  };

  return (
    <div className="modal-body p-5 pt-0 ">
      <div className="modal-header p-5 pb-4 border-bottom-0">
        <h1 className="text-primary fw-bold mb-0 fs-2">Sign Up</h1>
        <Link
          to="/"
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></Link>
      </div>

      <div className="modal-body p-5 pt-0">
        <Formik
          initialValues={formData}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="g-3 needs-validation">
              <div className="col-4 form-group">
                <label htmlFor="name">Name:</label>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
              <div className="col-4 form-group">
                <label htmlFor="email">Email:</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className="col-4 form-group">
                <label htmlFor="phone">Phone:</label>
                <Field type="tel" name="phone" className="form-control" />
                <ErrorMessage name="phone" component="div" className="text-danger" />
              </div>
              <div className="col-4 form-group">
                <label htmlFor="username">Username:</label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>
              <div className="col-4 form-group">
                <label htmlFor="password">Password:</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <button type="submit" className="mt-3 btn btn-primary">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Signup;
