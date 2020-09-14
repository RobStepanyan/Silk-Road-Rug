import React from 'react';
import NavbarFooter from '../components/NavbarFooter';
import { CartCard } from '../components/Cards';
import { toCamelCase, calculateAdditionalCosts, calculatePriceSum, formatPrice } from '../other/functions';
import { cartCardInputsOrder, dummyData } from '../other/variables';

export default class Cart extends React.Component {
  constructor() {
    super();
    this.handleRadioWithPriceChange = this.handleRadioWithPriceChange.bind(this)
    this.state = {
      'additionalCosts': {},
      'selectedRadios': {},
      'selectedCheckboxes': {},
      'itemsQuanity': 4,
      'data': dummyData,
    }
  }

  handleRadioWithPriceChange(keyProp, name, id) {
    let { selectedRadios } = this.state;
    selectedRadios[keyProp][name] = id;

    this.setState({ 'selectedRadios': selectedRadios, 'additionalCosts': calculateAdditionalCosts(this.state.selectedRadios, this.state.selectedCheckboxes, this.state.data) })
  }

  handleCheckboxWithPriceChange(keyProp, name, id) {
    let { selectedCheckboxes } = this.state;

    selectedCheckboxes[keyProp][name].includes(id)
      ? selectedCheckboxes[keyProp][name].splice(selectedCheckboxes[keyProp][name].indexOf(id), 1) // remove id from the list
      : selectedCheckboxes[keyProp][name].push(id)

    this.setState({ 'selectedCheckboxes': selectedCheckboxes, 'additionalCosts': calculateAdditionalCosts(this.state.selectedRadios, this.state.selectedCheckboxes, this.state.data) })
  }

  handleClickClose(key) {
    let { data } = this.state;
    data.splice(key, 1)
    this.setState({ 'data': data })
  }

  componentWillMount() {
    let { additionalCosts, selectedRadios, selectedCheckboxes } = this.state;
    for (let i = 0; i <= this.state.data.length - 1; i++) {
      additionalCosts[i] = 0
      selectedRadios[i] = {}
      selectedCheckboxes[i] = {}
      selectedRadios[i]['shipping'] = 0 //iterate through data and check if radio's first item is not disabled
      selectedCheckboxes[i]['additional'] = [] // also extract shipping & additioal from data
    }
    this.setState({ 'selectedRadios': selectedRadios, 'selectedCheckboxes': selectedCheckboxes, 'additionalCosts': additionalCosts })
  }

  render() {
    const data = this.state.data

    const inputs = data.map(x => {
      return ([
        {
          'inputType': 'radio', 'heading': 'Shipping Method', 'name': 'shipping', 'items':
            cartCardInputsOrder['shipping'].map(shMthd => {
              return { 'label': shMthd, 'price': x['pricesUSD'][toCamelCase(shMthd)] }
            })
        },
        {
          'inputType': 'checkbox', 'heading': 'Additional Services', 'name': 'additional', 'items':
            cartCardInputsOrder['additional'].map(add => {
              return { 'label': add, 'price': x['pricesUSD'][toCamelCase(add)] }
            })
        }
      ])
    })

    return (
      <NavbarFooter>
        <section id="cart">
          <div className="container">
            <h1 className="text-center">Your Cart ({this.state.data.length})</h1>
            {this.state.data.length &&
              <div className="cart-header">
                <h2>Order Total</h2>
                <ul>
                  {this.state.data.map((data, i) => {
                    return (
                      <li key={i}>
                        <div className="col p-0">
                          {data.heading}
                          <span className="price">
                            {formatPrice(data.pricesUSD['price'])}
                          </span>
                        </div>
                      </li>
                    )
                  })
                  }
                </ul>
                <hr />
                <div className="total">
                  <p className="price">{formatPrice(calculatePriceSum(this.state.data, 0))}</p>
                  <p className="price">{'+' + formatPrice(calculatePriceSum(0, this.state.additionalCosts))}</p>
                  <h3 className="price">{formatPrice(calculatePriceSum(this.state.data, this.state.additionalCosts))}</h3>
                </div>
              </div>
            }
            {this.state.data.length
              ? (
                data.map((data, i) => {
                  return (
                    <CartCard
                      key={String(i)} keyProp={String(i)}
                      heading={data.heading} size={data.heading} style={data.style} color={data.color} imgSrc={data.imgSrc}
                      price={data.pricesUSD.price} additionalCosts={this.state.additionalCosts[i]}
                      inputs={inputs[i]} selectedId={this.state.selectedRadios[String(i)]} selectedIds={this.state.selectedCheckboxes[String(i)]}
                      onClickClose={() => this.handleClickClose(i)}
                      onChangeRadio={(keyProp, name, id) => this.handleRadioWithPriceChange(keyProp, name, id)}
                      onChangeCheckbox={(keyProp, name, id) => this.handleCheckboxWithPriceChange(keyProp, name, id)} />
                  )
                })
              )
              : (
                <div className="row mh-50">
                  <div className="col-12 m-auto">
                    <h2 className="text-center mt-n5">Your Cart is Empty</h2>
                    <p className="text-center">Add Rugs to your card so they will appear here.</p>
                  </div>
                </div>
              )
            }
          </div>
        </section >
      </NavbarFooter >
    )
  }
}