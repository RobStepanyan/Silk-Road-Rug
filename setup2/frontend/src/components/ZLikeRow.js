import React from 'react';

export function ZLikeRow1(props) {
  return (
    <>
      <div className="col-12 col-sm-6">
        <h2>{props.heading}</h2>
        <p>{props.text}</p>
      </div>
      <div className="col-12 col-sm-6">
        <img src={props.imgSrc} />
      </div>
    </>
  )
}

export function ZLikeRow2(props) {
  return (
    <>
      <div className="col-12 col-sm-6">
        <img src={props.imgSrc} />
      </div>
      <div className="col-12 col-sm-6">
        <h2>{props.heading}</h2>
        <p>{props.text}</p>
      </div>
    </>
  )
}