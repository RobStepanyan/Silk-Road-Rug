import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  RadioGroupWithPrice, CheckboxGroupWithPrice,
  RadioGroup, CheckboxGroup, RangeSliderGroup
} from './Form';
import { formatPrice } from '../other/functions';
import { hrefURLs } from '../other/variables';


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
  let [before, after] = props.price
  return (
    <div className={props.notResponsive ? "col-auto" : "col-6 col-sm-6 col-md-4"}>
      <a href={hrefURLs.rugById(props.id)} className="shop-card-a">
        <div className="shop-card">
          <img src={props.imgSrc} alt={props.imgAlt} />
        </div>
        <h5>{props.heading}</h5>
        {!after
          ? <h5 className="price">{formatPrice(before)}</h5>
          : <div className="d-flex">
            <h5 className="price mr-2">{formatPrice(after)}</h5>
            <h5 className="price discounted">{formatPrice(before)}</h5>
          </div>
        }
      </a>
    </div>
  )
}

export function CartCard(props) {
  return (
    <div className="cart card" >
      <div className="container">
        <div onClick={props.onClickClose} className="navbar-icon close-btn">
          <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" ><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" class=""></path></svg>
        </div>
        <div className="row">
          <div className="col-12 col-sm-4 p-0">
            <img src={props.imgSrc} alt="" />
          </div>
          <div className="col p-0">
            <h2>{props.heading}</h2>
            <h3 className="price">{formatPrice(props.price) + (props.additionalCosts ? ` (+${formatPrice(props.additionalCosts)})` : '')}</h3>
            <h4>Details</h4>
            <ul className="style-default">
              <li>Size: {props.size}</li>
              {props.style &&
                <li>Style: {props.style}</li>
              }
              {props.color &&
                <li>Color: {props.color}</li>
              }
            </ul>

            {props.inputs.map((input, i) => {
              let component;

              if (input.inputType == 'radio') {
                component = (
                  <RadioGroupWithPrice //key={String(i)}
                    selectedId={props.selectedId[input.name]}
                    onChange={(id) => props.onChangeRadio(props.keyProp, input.name, id)}
                    name={props.keyProp + input.name}
                    items={input.items} />
                )
              } else {
                component = (
                  component = (
                    <CheckboxGroupWithPrice // key={String(i)}
                      selectedIds={props.selectedIds[input.name]}
                      onChange={(id) => props.onChangeCheckbox(props.keyProp, input.name, id)}
                      name={props.keyProp + input.name}
                      items={input.items} />
                  )
                )
              }
              return (
                <div key={String(i)}>
                  <h4>{input.heading}</h4>
                  {component}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

CartCard.propTypes = {
  keyProp: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  style: PropTypes.string,
  color: PropTypes.string,
  imgSrc: PropTypes.string,
}


export class ShopFilterSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { 'filterToggled': false }
  }
  render() {
    return (
      <>
        <div id="filterToggle" onClick={() => this.setState({ 'filterToggled': !this.state.filterToggled })}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z" className=""></path>
          </svg>
        </div>
        <div className={"filter-sidebar" + (this.state.filterToggled ? ' toggled' : '')}>
          {this.props.inputs.map((input, i) => {
            let component;
            if (input.inputType == 'radio') {
              component = <RadioGroup name={input.name} items={input.items}
                onChange={itemNo => this.props.onChange(i, itemNo, 'radio')} selectedId={this.props.selectedInputs[i][0]} />

            } else if (input.inputType == 'checkbox') {
              component = <CheckboxGroup name={input.name} items={input.items}
                onChange={itemNo => this.props.onChange(i, itemNo, 'checkbox')} selectedIds={this.props.selectedInputs[i]} />

            } else if (input.inputType == 'range') {
              component = <RangeSliderGroup items={input.items}
                onChange={vars => this.props.onChange(i, vars, 'range')} values={this.props.selectedInputs[i]} />
            }

            return (
              <div key={i}>
                <h3>{input.heading} <p className="text-gray font-secondary d-inline">{input.subHeading}</p></h3>
                {component}
              </div>
            )
          })
          }
        </div>
      </>
    )
  }
}