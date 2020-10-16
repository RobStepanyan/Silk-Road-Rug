import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import NavbarFooter from '../../components/NavbarFooter';
import { toTitleCase } from '../../other/functions';
import { apiHeaders, apiURLs, cartCardInputsOrder } from '../../other/variables';
import { Addresses } from '../account/Account';
import { loadStripe } from '@stripe/stripe-js';
import Loading from '../../components/Loading';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HW4GfCi0RkzIpI9n9JCxZctQNH5HsQTUC92yFZWO9r0RKrHHxmIfvAMFPCOicGZ8ou1aEEm4F7AaglwzuB3EeeZ00faB2nc03');

export default class Checkout extends React.Component {
  constructor(props) {
    super()
    this.state = {
      stage: ['address', 'payment'][0],
      redirectNow: false,
      loading: true,
      cartItems: [],
      addresses: [],
      displayAddAddress: false,
      displayEditAddress: false,
      editId: null,
      willCalls: 0, //quantity of will-call pick ups in cart items
      alert: null,
    }

    this.getAddresses = this.getAddresses.bind(this)
    this.onClickAccount = this.onClickAccount.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      headers: apiHeaders.authorization,
      url: apiURLs.user.cart.list,
    })
      .then(res => {
        let { data } = res;
        if (data.length === 0) {
          this.setState({ redirectNow: true })
        } else {
          let willCalls = 0
          data.forEach(x => {
            if (x.selecteds.includes(cartCardInputsOrder.shipping['Will-Call Pick Up'])) {
              willCalls += 1
            }
          })
          this.setState({ cartItems: data, willCalls, loading: false })
        }
      })
      .catch(this.setState({ loading: false }))

    this.getAddresses()
  }

  getAddresses() {
    axios({
      method: 'get',
      headers: apiHeaders.authorization,
      url: apiURLs.user.addresses,
    })
      .then(res => {
        let { data } = res;
        this.setState({ addresses: data })
      })
  }

  onClickAccount(x, val) {
    this.setState({ [x]: val })
  }

  async handleClickPayment() {
    this.setState({ loading: true })
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await axios({
      method: 'post',
      headers: { ...apiHeaders.authorization, ...apiHeaders.csrf },
      url: apiURLs.checkout.createSession
    });
    if (response.data.error) { this.setState({ alert: response.data.error, loading: false }); return }

    const session = await response.data;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      this.setState({ alert: result.error, loading: false })
      window.scrollTo(0, 0)
    }
  }

  render() {
    const stages = ['address', 'payment']

    if (this.state.redirectNow) { return <Redirect to='/cart' /> }
    if (this.state.loading) { return <Loading /> }
    return (
      <NavbarFooter>
        <section id="checkout">
          <div className="container">
            {this.state.alert &&
              <div className="alert danger">{this.state.alert}</div>
            }
            <h1 className="text-center">Checkout</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                {stages.map((x, i) => {
                  return <li key={i} className={"breadcrumb-item" + (this.state.stage === x ? ' active' : '')}>
                    {toTitleCase(x)}
                  </li>
                })
                }
              </ol>
            </nav>

            <>
              {(this.state.displayAddAddress || this.state.displayEditAddress) &&
                <div className="btn btn-secondary btn-back mb-3 ml-0" onClick={() => window.location.reload()}>Back</div>
              }
              {(this.state.cartItems.length > this.state.willCalls && this.state.willCalls > 0)
                && <>
                  <h2 className="mb-3">Your Address</h2>
                  <Addresses integrated={true} redirectTo={'.'} onClick={(x, val) => this.onClickAccount(x, val)} state={this.state} />
                  <WillCall />
                </>
              }
              {this.state.cartItems.length === this.state.willCalls && this.state.cartItems.length > 0
                && <WillCall />
              }
              {this.state.willCalls === 0
                && <Addresses integrated={true} redirectTo={'.'} onClick={(x, val) => this.onClickAccount(x, val)} state={this.state} />
              }
              {!this.state.displayAddAddress && !this.state.displayEditAddress &&
                <div className="row">
                  <div className="col">
                    {(this.state.addresses.length && this.state.cartItems.length > this.state.willCalls) || this.state.cartItems.length === this.state.willCalls
                      ? <div className="btn btn-primary mx-0" onClick={() => this.handleClickPayment()}>Proceed to Payment</div>
                      : <div className="btn btn-primary disabled mx-0">Proceed to Payment</div>
                    }
                  </div>
                </div>
              }
            </>
          </div>
        </section>
      </NavbarFooter >
    )
  }

}

function WillCall() {
  return (
    <>
      <h2 className="mb-3">Will-Call Pick Up Location</h2>
      <div className="mapouter">
        <div className="gmap_canvas"><iframe title="map" id="gmap_canvas" src="https://maps.google.com/maps?q=2881%20W.%20PICO%20BLVD.%20LOS%20ANGELES%2C%20CA%2090006&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
        </div>
      </div>
    </>
  )
}

