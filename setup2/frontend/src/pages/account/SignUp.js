import React from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import Form from '../../components/Form';
import { apiURLs } from '../../other/variables';
import axios from 'axios';

const handleSubmit = (values) => {
  return axios({
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
            redirectTo="/" redirectTitle="Go to Home" authForm={true}
            cols="col-12 col-sm-10 col-lg-6" submitText="Sign Up" fields={[
              { context: 'text', autoComplete: 'first-name', title: 'first name', required: true, half: true },
              { context: 'text', autoComplete: 'last-name', title: 'last name', required: true, half: true },
              { context: 'email', autoComplete: 'email', required: true, half: false },
              { context: 'password', autoComplete: 'new-password', title: 'password', required: true, half: false },
              { context: 'password', autoComplete: 'new-password', title: 'confirm password', required: true, half: false },
            ]} />
        </div>
      </section>
    </NavbarFooter>
  )
}