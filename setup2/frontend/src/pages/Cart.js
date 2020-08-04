import React from 'react';
import NavbarFooter from '../components/NavbarFooter';
import { CartCard } from '../components/Cards';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.handleRadioWithPriceChange = this.handleRadioWithPriceChange.bind(this)
    this.state = {
      'selectedRadios': {},
      'itemsQuanity': 2
    }
  }

  handleRadioWithPriceChange(keyProp, nameString, id) {
    let selectedRadios = this.state.selectedRadios;
    selectedRadios[keyProp][nameString] = id
    this.setState({ 'selectedRadios': selectedRadios })
  }

  componentWillMount() {
    let selectedRadios = this.state.selectedRadios;
    for (let i = 0; i <= this.state.itemsQuanity - 1; i++) {
      selectedRadios[i] = {}
      selectedRadios[i]['shipping'] = 0
    }
    this.setState({ 'selectedRadios': selectedRadios })
  }

  render() {
    return (
      <NavbarFooter>
        <section id="cart">
          <div className="container">
            <h1 className="text-center">Your Cart ({this.state.itemsQuanity})</h1>
            {this.state['itemsQuanity'] > 0
              ? (
                Array.from({ length: 2 }, (x, i) => i).map(i => {
                  return (
                    <CartCard
                      key={String(i)} keyProp={String(i)} heading="Name of the Rug" size="1' x 3'" style="Contemporary" color="White" imgSrc="/static/frontend/img/rug.jpeg"
                      pricesUSD={{ 'price': 25000.00, 'groundShipping': 250, 'insurance': 100.00, 'expeditedShipping': 300.00 - 250.00, 'signatureReleaseRequired': 0.00, 'whiteGloveDelivery': 200.00 }}
                      selectedKeyShipping={this.state.selectedRadios[String(i)]['shipping']}
                      onChange={(keyProp, nameString, id) => this.handleRadioWithPriceChange(keyProp, nameString, id)} />
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