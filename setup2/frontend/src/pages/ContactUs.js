import React from 'react';
import NavbarFooter from '../components/NavbarFooter';
import { validateEmail } from '../other/functions';

export default class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'name': '',
      'email': '',
      'msg': '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleInputChange(event) {
    let name = event.target.name;
    let val = event.target.value;
    this.setState({ [name]: val })
  }

  handleSubmitClick() {
    let valid = false;
    if (this.state['name'] && this.state['email'] && this.state['msg']) {
      if (validateEmail(this.state['email'])) {
        valid = true
      }
    }

    // if (valid) {
    //   // send api reqeust
    // }

  }

  render() {
    return (
      <NavbarFooter>
        <section id="contact">
          <div className="container">
            <h1 className="text-center">Contact Us</h1>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h3>Name</h3>
                      <input onChange={this.handleInputChange} name="name" type="text" id="contact-us-name" placeholder="Enter your name here" />
                    </div>
                    <div className="col-12 col-md-6">
                      <h3>Email</h3>
                      <input onChange={this.handleInputChange} name="email" type="text" id="contact-us-email" placeholder="example@example.com" />
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <h3>Message</h3>
                      <textarea onChange={this.handleInputChange} name="msg" id="contact-us-msg" placeholder="Enter your message here"></textarea>
                    </div>
                    <div onClick={this.handleSubmitClick} className="btn btn-primary mb-4">Send a Message</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center mb-3">
              <div className="col-auto mb-4">
                <h2 className="text-center">Call</h2>
                <ul>
                  <li><a href="tel:+14247775335">+1 (424) 777-5335</a></li>
                  <hr />
                  <li><a href="tel:+12132154944">+1 (213) 215-4944</a></li>
                </ul>
              </div>
            </div>
            <div className="row justify-content-center mb-5">
              <div className="col-auto">
                <h2 className="text-center">Send an Email</h2>
                <ul>
                  <li><a href="mailto:info@silkroadruginc.com">Info@Silkroadruginc.Com</a></li>
                </ul>
              </div>
            </div>

            <h2 className="text-center mb-2">Address</h2>
            <div className="mapouter">
              <div className="gmap_canvas"><iframe id="gmap_canvas" src="https://maps.google.com/maps?q=2881%20W.%20PICO%20BLVD.%20LOS%20ANGELES%2C%20CA%2090006&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
              </div>
            </div>
          </div>
        </section>
      </NavbarFooter>
    )
  }
}