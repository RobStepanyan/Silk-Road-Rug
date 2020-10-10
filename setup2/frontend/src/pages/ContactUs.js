import React from 'react';
import NavbarFooter from '../components/NavbarFooter';
import Form from '../components/Form';

export default function ContactUs() {
  return (
    <NavbarFooter>
      <section id="contact">
        <div className="container">
          <h1 className="text-center">Contact Us</h1>
          <hr />
          <p>We would love to hear from you!</p>

          {/* <Form fields={[
            { 'context': 'text', 'title': 'name', 'required': false, 'half': true },
            { 'context': 'email', 'required': true, 'half': true },
            { 'context': 'textarea', 'required': true, 'half': false },
            { 'context': 'file', 'maxSizeMB': 25, 'required': false, 'half': false }
          ]} /> */}


          <h2 id="map" className="text-center mb-2">Address</h2>
          <div className="mapouter">
            <div className="gmap_canvas"><iframe id="gmap_canvas" src="https://maps.google.com/maps?q=2881%20W.%20PICO%20BLVD.%20LOS%20ANGELES%2C%20CA%2090006&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-auto mb-4">
              <h2 className="text-center">Call</h2>
              <ul>
                <li><a href="tel:+14247775335">+1 (424) 777-5335</a></li>
                <hr />
                <li><a href="tel:+12132154944">+1 (213) 215-4944</a></li>
              </ul>
            </div>
          </div>
          <div className="row justify-content-center mb-3">
            <div className="col-auto">
              <h2 className="text-center">Send an Email</h2>
              <ul>
                <li><a href="mailto:info@silkroadruginc.com">Info@Silkroadruginc.Com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </NavbarFooter>
  )
}