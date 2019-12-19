import React, { useState, useEffect } from "react";
import Axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";

function UserForm({ touched, errors, values, status }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    status && setUser(ele => [...ele, status]);
  }, [status]);

  return (
    <div>
      <h1>HelloWorld</h1>
      <Form>
        {/* label and form and validate*/}
        <label htmlFor="name">Name: </label>
        <Field id="name" type="text" name="name" placeholder="Enter UserName" />
        {touched.name && errors.name && <p className="errors">{errors.name}</p>}
        {/* label and form validate */}
        <label htmlFor="password">Password: </label>
        <Field
          id="password"
          type="text"
          name="password"
          placeholder="Enter password"
        />
        {touched.password && errors.password && (
          <p className="errors">{errors.password}</p>
        )}
        {/* label and form validate */}
        <label htmlFor="email">Email: </label>
        <Field id="email" type="text" name="email" placeholder="Enter Email" />
        {touched.email && errors.email && (
          <p className="errors">{errors.email}</p>
        )}
        {/* label and form validate */}
        <label htmlFor="Terms">Do you accept our terms of servivce?</label>
        <Field
          id="terms"
          type="checkbox"
          name="terms"
          placeholder="yes"
          checked={values.terms}
        />

        <button type="submit">Submit</button>
      </Form>
      {user.map((ele, index) => {
        return (
          <div key={index}>
            <h1>Name: {ele.name}</h1>
            <h1>Email: {ele.email}</h1>
            <h2>Accepted</h2>
          </div>
        );
      })}
    </div>
  );
}

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      password: props.password || "",
      email: props.email || "",
      terms: props.terms || false
    };
  },

  validationSchema: yup.object().shape({
    name: yup
      .string()
      .min(2, "too short")
      .required("Provide a name"),
    password: yup
      .string()
      .min(2, "too short")
      .required("Provide a password"),
    email: yup
      .string()
      .min(2, "too short")
      .required("Provide a email"),
    terms: yup.string().required("Must Accept Terms of Service")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    Axios.post("https://reqres.in/api/users", values)
      .then(res => {
        console.log(res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => {
        console.log(err);
      });
  }
})(UserForm);

export default FormikUserForm;
