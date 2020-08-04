import React, { Component } from 'react';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import { RadioGroupWithPrice } from './Form';
import { formatPrice } from '../other/functions';

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

export class CartCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cart card" >
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-4 p-0">
              <img src={this.props.imgSrc} alt="" />
            </div>
            <div className="col p-0">
              <h2>{this.props.heading}</h2>
              <h3 className="price">{formatPrice(this.props.pricesUSD['price'])}</h3>
              <h4>Details</h4>
              <ul className="style-default">
                <li>Size: {this.props.size}</li>
                {this.props.style &&
                  <li>Style: {this.props.style}</li>
                }
                {this.props.color &&
                  <li>Color: {this.props.color}</li>
                }
              </ul>

              <h4>Shipping Method</h4>
              <RadioGroupWithPrice
                selectedKeyShipping={this.props.selectedKeyShipping}
                onChange={(id) => this.props.onChange(this.props.keyProp, 'shipping', id)}
                name={this.props.keyProp + "shiping"}
                items={[
                  { 'label': 'Will-Call Pick Up', 'price': 0 },
                  { 'label': 'Ground Shipping', 'price': this.props.pricesUSD['groundShipping'] }
                ]} />
              {/* <ul className="style-default p-0">
                <div className="form-check">
                  <input type="radio" name={this.props.keyProp + "shipping"} id="willCall" value="name" checked />
                  <label className="form-check-label" htmlFor="willCall">
                    Will-Call Pick Up <span className="price">(Free)</span>
                  </label>
                </div>
                <div className="form-check">
                  <input type="radio" name={this.props.keyProp + "shipping"} id="ground" value="price" />
                  <label className="form-check-label" htmlFor="ground">
                    Ground Shipping <span className="price">{`(+$${this.props.pricesUSD['groundShipping']})`}</span>
                  </label>
                </div>
              </ul> */}

              <h4>Additional Services</h4>
              <ul className="style-default p-0">
                <div className="form-check">
                  <input type="checkbox" name={this.props.keyProp + "additional"} id="insurance" value="name" />
                  <label className="form-check-label" htmlFor="insurance">
                    Insurance <span className="price">{`(+$${this.props.pricesUSD['insurance']})`}</span>
                  </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" name={this.props.keyProp + "additional"} id="expedited" value="price" />
                  <label className="form-check-label" htmlFor="expedited">
                    Expedited Shipping <span className="price">{`(+$${this.props.pricesUSD['expeditedShipping']})`}</span>
                  </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" name={this.props.keyProp + "additional"} id="signature" value="name" />
                  <label className="form-check-label" htmlFor="signature">
                    Signature Release Required <span className="price">{`(+$${this.props.pricesUSD['signatureReleaseRequired']})`}</span>
                  </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" name={this.props.keyProp + "additional"} id="whiteGlove" value="price" />
                  <label className="form-check-label" htmlFor="whiteGlove">
                    White Glove Delivery <span className="price">{`(+$${this.props.pricesUSD['whiteGloveDelivery']})`}</span>
                  </label>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CartCard.propTypes = {
  keyProp: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  style: PropTypes.string,
  color: PropTypes.string,
  imgSrc: PropTypes.string,
  pricesUSD: PropTypes.object.isRequired,
}