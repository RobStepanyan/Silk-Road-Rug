import React from 'react';
import Dropdown from './Dropdown';

export default function Card(props) {
  return (
    <div className="card">
      <h2 className="card-heading">{props.heading}</h2>
      <div className="card-text">
        {props.text.slice(0, 220) + '...'}
      </div>
      {props.withBtn &&
        <a className="btn btn-secondary">{props.btnText}</a>
      }
    </div>
  )
}

export function ShopCard(props) {
  return (
    <div className="col">
      <div className="shop-card">
        <img src={props.imgSrc} alt={props.imgAlt} />
      </div>
      <a href="">
        <h3>{props.heading}</h3>
      </a>
      <p>{props.price}</p>
    </div>
  )
}


export function ShopFilterCard(props) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="shop-filter-card">
        <h2 className="card-heading">{props.heading.slice(0, 1).toUpperCase() + props.heading.slice(1)}</h2>
        <Dropdown heading={props.heading} values={props.values} />
      </div>
    </div >
  )
}