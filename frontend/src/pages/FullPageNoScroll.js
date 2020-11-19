import React from 'react';
import NavbarFooter from '../components/NavbarFooter';

export default function FullPageNoScroll(props) {
  return (
    <NavbarFooter>
      <div className="full-page-noscroll" >
        <div className="centered-div">
          <h1>{props.heading}</h1>
          <div className="sub-heading">{props.text}</div>
          <a href={props.btnHref} className="btn btn-primary">{props.btnText}</a>
        </div>
      </div>
    </NavbarFooter>
  )
}