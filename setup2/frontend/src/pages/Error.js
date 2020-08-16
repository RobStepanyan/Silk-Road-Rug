import React from 'react';
import PropTypes from 'prop-types';

export default function Error(props) {
  return (
    <div className="full-page-noscroll">
      <div className="centered-div">
        <h1>OOPS! Something Went Wrong</h1>
        <div className="sub-heading">Error {props.error}</div>
        <a href="/" className="btn btn-primary">Back to Home</a>
      </div>
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.number.isRequired,
}