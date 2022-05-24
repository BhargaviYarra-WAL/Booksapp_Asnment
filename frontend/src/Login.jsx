import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Button, Input } from 'reactstrap';
import axios from 'axios';
import './styles/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    async onSubmit(values) {
      const spinner = document.querySelector('#loading-spinner');
      spinner.style.visibility = 'visible';
      await axios
        .post('/bookuser/checklogin', {
          username: values.username,
          password: values.password,
        })
        .then((response) => {
          localStorage.setItem('regtoken', JSON.stringify(response.data.token));
          localStorage.setItem(
            'regtoken user',
            JSON.stringify(response.data.users)
          );

          document.querySelector('#list').style.display = 'block';
          document.querySelector('#login-btn').style.display = 'none';
          document.querySelector('#logout-btn').style.display = 'inline';

          spinner.style.visibility = 'hidden';

          navigate('/');
        })
        .catch((errors) => {
          console.log(errors.response.data);
          setError(errors.response.data.message);
        });

      spinner.style.visibility = 'hidden';
    },
    validate() {
      const errors = {};
      if (formik.values.password.length < 6) {
        errors.password = "Can't be less than 6 characters";
      }
      if (formik.values.username.length < 3) {
        errors.username = "Can't be less than 3 characters";
      }
      return errors;
    },
  });
  return (
    <div className="login-container text-right">
      <Form onSubmit={formik.handleSubmit} noValidate>
        <h1 className="reg-heading">Login</h1>
        <FormGroup>
          <Input
            required
            type="text"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="Enter username"
          />
          <p className="validation-error">
            {formik.errors.username ? formik.errors.username : null}
          </p>
          <div
            id="error-status"
            className="text-left text-danger text-capitalize m-1 p-2 d-flex"
          >
            <p>{error}</p>
          </div>
        </FormGroup>
        <FormGroup>
          <Input
            required
            type="password"
            name="password"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter password"
          />
          <p className="validation-error">
            {formik.errors.password ? formik.errors.password : null}
          </p>

          <div
            id="error-status"
            className="text-left text-danger text-capitalize m-1 p-2 d-flex"
          >
            <p>{error}</p>
          </div>
        </FormGroup>
        <div className="text-center">
          <Button color="success">Login</Button>
        </div>

        <div
          id="loading-spinner"
          className="spinner-border text-success d-block"
          role="status"
        />
      </Form>
    </div>
  );
}
