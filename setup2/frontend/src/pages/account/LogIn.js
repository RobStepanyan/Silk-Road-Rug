import React from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import Form from '../../components/Form';
import axios from 'axios';
import { apiURLs } from '../../other/variables';

const handleSubmit = (values) => {
  const cookies = new Cookies()
  let csrftoken = cookies.get('csrftoken')

  return axios({
    url: apiURLs['logIn'],
    headers: {
      'X-CSRFToken': csrftoken,
    },
    method: 'post',
    data: values,
  })
}

export default function LogIn() {
  return (
    <NavbarFooter>
      <section id="login">
        <div className="container mh-50">
          <h1 className="center">Log In</h1>
          <Form handleSubmit={handleSubmit} redirect={true} authForm={true} setJWT={true} loginForm={true}
            cols="col-12 col-sm-10 col-md-7 col-lg-5" submitText="Log In" fields={[
              { context: 'email', autoComplete: 'email', required: true, half: false, validate: false },
              { context: 'password', autoComplete: 'password', title: 'password', required: true, half: false, validate: false },
            ]} />
          <small className="center m-0">Haven't got an account yet? <a className="with-underline" href="/signup">Sign Up</a></small>
        </div>
      </section>
    </NavbarFooter >
  )
}