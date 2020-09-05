import React from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import { AccountCard } from '../../components/Cards';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavbarFooter>
        <section id="account">
          <div className="container mh-50">
            <h1>Account</h1>
            <div className="row">
              <div className="col-12">
                <AccountCard title="Personal Info" href="/account/personal-info">
                  <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32c61.8 0 112 50.2 112 112s-50.2 112-112 112-112-50.2-112-112S194.2 32 256 32m128 320c52.9 0 96 43.1 96 96v32H32v-32c0-52.9 43.1-96 96-96 85 0 67.3 16 128 16 60.9 0 42.9-16 128-16M256 0c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144S335.5 0 256 0zm128 320c-92.4 0-71 16-128 16-56.8 0-35.7-16-128-16C57.3 320 0 377.3 0 448v32c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-32c0-70.7-57.3-128-128-128z" ></path></svg>
                </AccountCard>
              </div>
              <div className="col-12">
                <AccountCard title="Security" href="/account/security">
                  <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="lock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-16v-62.5C384 73.1 312.9.3 224.5 0 136-.3 64 71.6 64 160v64H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zM96 160c0-70.6 57.4-128 128-128s128 57.4 128 128v64H96v-64zm304 320H48c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v192c0 8.8-7.2 16-16 16z"></path></svg>
                </AccountCard>
              </div>
              <div className="col-12">
                <AccountCard title="Orders" href="/account/orders">
                  <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="hand-holding-box" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M112 256h352c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16zM256 32h64v76.2l-32-16-32 16V32zm-128 0h96v128l64-32 64 32V32h96v192H128V32zm430.3 301.6c-9.6-8.6-22.1-13.4-35.2-13.4-12.5 0-24.8 4.3-34.6 12.2l-61.6 49.3c-1.9 1.5-4.2 2.3-6.7 2.3h-41.6c4.6-9.6 6.5-20.7 4.8-32.3-4-27.9-29.6-47.7-57.8-47.7H181.3c-20.8 0-41 6.7-57.6 19.2L85.3 352H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h88l46.9-35.2c11.1-8.3 24.6-12.8 38.4-12.8H328c13.3 0 24 10.7 24 24s-10.7 24-24 24h-88c-8.8 0-16 7.2-16 16s7.2 16 16 16h180.2c9.7 0 19.1-3.3 26.7-9.3l61.6-49.2c4.2-3.4 9.5-5.2 14.6-5.2 5 0 9.9 1.7 13.8 5.2 10.1 9.1 9.3 24.5-.9 32.6l-100.8 80.7c-7.6 6.1-17 9.3-26.7 9.3H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h400.5c17 0 33.4-5.8 46.6-16.4L556 415c12.2-9.8 19.5-24.4 20-40s-6-30.8-17.7-41.4z"></path></svg>
                </AccountCard>
              </div>
              <div className="col-12">
                <AccountCard title="Log Out" href="/logout" withoutAngle={true} danger={true}>
                  <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="sign-out-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M160 217.1c0-8.8 7.2-16 16-16h144v-93.9c0-7.1 8.6-10.7 13.6-5.7l141.6 143.1c6.3 6.3 6.3 16.4 0 22.7L333.6 410.4c-5 5-13.6 1.5-13.6-5.7v-93.9H176c-8.8 0-16-7.2-16-16v-77.7m-32 0v77.7c0 26.5 21.5 48 48 48h112v61.9c0 35.5 43 53.5 68.2 28.3l141.7-143c18.8-18.8 18.8-49.2 0-68L356.2 78.9c-25.1-25.1-68.2-7.3-68.2 28.3v61.9H176c-26.5 0-48 21.6-48 48zM0 112v288c0 26.5 21.5 48 48 48h132c6.6 0 12-5.4 12-12v-8c0-6.6-5.4-12-12-12H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h132c6.6 0 12-5.4 12-12v-8c0-6.6-5.4-12-12-12H48C21.5 64 0 85.5 0 112z"></path></svg>
                </AccountCard>
              </div>
            </div>
          </div>
        </section>
      </NavbarFooter>
    )
  }
}