import React from 'react';
import NavbarFooter from '../components/NavbarFooter';
import { CartCard } from '../components/Cards';
import { toCamelCase, calculateAdditionalCosts } from '../other/functions';
import { cartCardInputsOrder } from '../other/variables';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.handleRadioWithPriceChange = this.handleRadioWithPriceChange.bind(this)
    this.state = {
      'additionalCosts': {},
      'selectedRadios': {},
      'selectedCheckboxes': {},
      'itemsQuanity': 4,
      'data': [
        {
          'heading': 'Name of the Rug', 'size': "1' x 3'", 'style': 'Contemporary',
          'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
          'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': null, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
        },
        {
          'heading': 'Name of the Rug', 'size': "1' x 3'", 'style': 'Contemporary',
          'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
          'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
        },
        {
          'heading': 'Name of the Rug', 'size': "1' x 3'", 'style': 'Contemporary',
          'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
          'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': null, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': null },
        },
        {
          'heading': 'Name of the Rug', 'size': "1' x 3'", 'style': 'Contemporary',
          'color': 'White', 'imgSrc': '/static/frontend/img/rug.jpeg',
          'pricesUSD': { 'price': 25000.00, 'willcallPickUp': 0, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 },
        }
      ],
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

  componentWillMount() {
    let { additionalCosts, selectedRadios, selectedCheckboxes } = this.state;
    for (let i = 0; i <= this.state.itemsQuanity - 1; i++) {
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
            cartCardInputsOrder['additional'].map(shMthd => {
              return { 'label': shMthd, 'price': x['pricesUSD'][toCamelCase(shMthd)] }
            })
        }
      ])
    })

    return (
      <NavbarFooter>
        <section id="cart">
          <div className="container">
            <h1 className="text-center">Your Cart ({this.state.itemsQuanity})</h1>
            {this.state['itemsQuanity'] > 0
              ? (
                data.map((data, i) => {
                  return (
                    <CartCard
                      key={String(i)} keyProp={String(i)}
                      heading={data.heading} size={data.heading} style={data.style} color={data.color} imgSrc={data.imgSrc}
                      price={data.pricesUSD.price} additionalCosts={this.state.additionalCosts[i]}
                      inputs={inputs[i]} selectedId={this.state.selectedRadios[String(i)]} selectedIds={this.state.selectedCheckboxes[String(i)]}
                      onChangeRadio={(keyProp, name, id) => this.handleRadioWithPriceChange(keyProp, name, id)}
                      onChangeCheckbox={(keyProp, name, id) => this.handleCheckboxWithPriceChange(keyProp, name, id)} />
                  )
                })
                // Array.from({ length: 2 }, (x, i) => i).map(i => {
                //   return (
                //     <CartCard
                //       key={String(i)} keyProp={String(i)} heading="Name of the Rug" size="1' x 3'" style="Contemporary" color="White" imgSrc="/static/frontend/img/rug.jpeg"
                //       pricesUSD={{ 'price': 25000.00, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 }}
                //       selectedId={this.state.selectedRadios[String(i)]['shipping']}
                //       selectedIds={this.state.selectedCheckboxes[String(i)]['additional']}
                //       onChangeRadio={(keyProp, name, id) => this.handleRadioWithPriceChange(keyProp, name, id)}
                //       onChangeCheckbox={(keyProp, name, id) => this.handleCheckboxWithPriceChange(keyProp, name, id)} />
                //   )
                // })
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