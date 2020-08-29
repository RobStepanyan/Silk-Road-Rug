import React from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import Form from '../../components/Form';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavbarFooter>
        <section id="signup">
          <div className="container">
            <h1 className="center">Sign Up</h1>
            <Form cols="col-12 col-sm-10 col-lg-6" submitText="Sign Up" fields={[
              { context: 'text', autoComplete: 'username', title: 'first name', required: true, half: true },
              { context: 'text', autoComplete: 'username', title: 'last name', required: true, half: true },
              { context: 'email', autoComplete: 'username', required: true, half: false },
              { context: 'password', autoComplete: 'new-password', title: 'password', required: true, half: false },
              { context: 'password', autoComplete: 'new-password', title: 'confirm password', required: true, half: false },
            ]} />
          </div>
        </section>
      </NavbarFooter>
    )
  }
}