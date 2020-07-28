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
        <a href={props.btnHref} className="btn btn-secondary">{props.btnText}</a>
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

export function CartCard(props) {
  return (
    <div className="cart card">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4 p-0">
            <img src={props.imgSrc} alt="" />
          </div>
          <div className="col p-0">
            <h2>{props.heading}</h2>
            <h4>Details</h4>
            <ul className="style-default">
              <li>Size: {props.size}</li>
              <li>Style: {props.style}</li>
              <li>Color: {props.color}</li>
            </ul>

            <h4>Shipping Method</h4>
            <ul className="style-default p-0">
              <div className="form-check">
                <input type="radio" name={props.keyProp + "shipping"} id="willCall" value="name" checked />
                <label className="form-check-label" htmlFor="willCall">
                  Will-Call Pick Up
                </label>
              </div>
              <div className="form-check">
                <input type="radio" name={props.keyProp + "shipping"} id="ground" value="price" />
                <label className="form-check-label" htmlFor="ground">
                  Ground Shipping
                </label>
              </div>
            </ul>

            <h4>Additional Services</h4>
            <ul className="style-default p-0">
              <div className="form-check">
                <input type="checkbox" name={props.keyProp + "additional"} id="insurance" value="name" />
                <label className="form-check-label" htmlFor="insurance">
                  Insurance
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" name={props.keyProp + "additional"} id="expedited" value="price" />
                <label className="form-check-label" htmlFor="expedited">
                  Expedited Shipping
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" name={props.keyProp + "additional"} id="signature" value="name" />
                <label className="form-check-label" htmlFor="signature">
                  Signature Release Required
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" name={props.keyProp + "additional"} id="whiteGlove" value="price" />
                <label className="form-check-label" htmlFor="whiteGlove">
                  White Glove Delivery
                </label>
              </div>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row justify-content-end">
          <div className="col">
            <p>{props.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}