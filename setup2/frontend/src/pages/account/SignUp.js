import React from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import Form from '../../components/Form';
import { apiURLs, apiHeaders } from '../../other/variables';
import axios from 'axios';
import Cookies from 'universal-cookie';

const handleSubmit = (values) => {
  const cookies = new Cookies()
  let csrftoken = cookies.get('csrftoken')

  return axios({
    headers: apiHeaders.csrf,
    url: apiURLs['signUp'],
    method: 'post',
    data: values,
  })
}

export default function SignUp() {


  return (
    <NavbarFooter>
      <section id="signup">
        <div className="container">
          <h1 className="center">Sign Up</h1>
          <Form handleSubmit={handleSubmit} submitFields={['first_name', 'last_name', 'email', 'password']}
            authForm={true}
            cols="col-12 col-sm-10 col-lg-6" submitText="Sign Up" removeBtnAfterSubmit={true} fields={[
              { context: 'text', autoComplete: 'first-name', title: 'first name', onlyText: true, required: true, half: true },
              { context: 'text', autoComplete: 'last-name', title: 'last name', onlyText: true, required: true, half: true },
              { context: 'email', autoComplete: 'email', required: true, half: false },
              { context: 'password', autoComplete: 'new-password', title: 'password', required: true, half: false },
              { context: 'password', autoComplete: 'new-password', title: 'confirm password', required: true, half: false },
            ]} />
          <small className="center m-0">Already have an account? <a className="with-underline" href="/login">Log In</a></small>
        </div>
      </section>
    </NavbarFooter>
  )
}