import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import {api} from '../axios/api';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^\d{10}$/),
  username: yup.string().required(),
  password: yup.string().required().min(6),
});

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    schema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        // form data is valid
        console.log('form data is valid:', formData);
        try {
            const response = await api.post("/user/signup", formData);
            console.log(response.data);
            //setResponse(response.data);
          } catch (error) {
            console.log(error);
          }
      })
      .catch((err) => {
        // form data is invalid
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <div className="modal-body p-5 pt-0 ">
      <div className="modal-header p-5 pb-4 border-bottom-0">
                <h1 className="text-primary fw-bold mb-0 fs-2">Sign Up</h1>
                <Link to="/" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Link>
        </div>

        <div class="modal-body p-5 pt-0">
        <form onSubmit={handleSubmit} className="row g-3 needs-validation">
        <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div>{errors.name}</div>}
      </div>
      <div className="col-6 form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <div>{errors.phone}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <div>{errors.username}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div>{errors.password}</div>}
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        </div>
    </div>
  );
}

export default Signup;
