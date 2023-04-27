import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { apiWithToken } from "../axios/api";
import { Card } from "react-bootstrap";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .matches(/^\d{10}$/)
    .required(),
});



function Update() {

  const [user, setUser] = useState({});
  const username = sessionStorage.getItem("username");
  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await apiWithToken.get(
          `/user/profile?username=${sessionStorage.getItem("username")}`
        );
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getInfo();
  }, [username]);

  const [formData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // handle form submission
    try {
      const response = await apiWithToken.put("/user/updateProfile", {
        ...values,
        username: user.username,

      });
      if (response.data === "Duplicate Username") {
        alert("Username already exists");
        return;
      }
      //setResponse(response.data);
      navigate("/login");
    } catch (error) {
      alert("Email already exists");
      console.log(error);
    }
  };

  return (
    <div className=" pt-5 d-flex justify-content-center">
      <Card style={{ width: "28rem" }}>
        <div className="modal-header p-5 pb-4 border-bottom-0">
          <h1 className="text-primary fw-bold mb-0 fs-2">Update</h1>
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
              <Form className="g-6 needs-validation">
                <div className="col-12 form-group">
                  <label htmlFor="name">Name:</label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-12 form-group">
                  <label htmlFor="email">Email:</label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-12 form-group">
                  <label htmlFor="phone">Phone:</label>
                  <Field type="tel" name="phone" className="form-control" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button type="submit" className="mt-3 btn btn-primary">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Card>
    </div>
  );
}

export default Update;
