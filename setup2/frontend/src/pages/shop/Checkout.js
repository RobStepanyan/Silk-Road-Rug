import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import NavbarFooter from '../../components/NavbarFooter';
import { toTitleCase } from '../../other/functions';
import { apiHeaders, apiURLs } from '../../other/variables';
import { Addresses } from '../account/Account';

export default class Checkout extends React.Component {
  constructor(props) {
    super()
    this.state = {
      stage: ['address', 'payment'][0],
      redirectNow: false,
      loading: false,
      cartItems: [],
      addresses: [],
      displayAddAddress: false,
      displayEditAddress: false,
      editId: null
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
        if (data.length == 0) {
          this.setState({ redirectNow: true })
        } else {
          this.setState({ cartItems: data, loading: false })
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

  render() {
    const stages = ['address', 'payment']

    if (this.state.redirectNow) { return <Redirect to='/cart' /> }
    return (
      <NavbarFooter>
        <section id="checkout">
          <div className="container">
            <h1 className="text-center">Checkout</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                {stages.map((x, i) => {
                  return <li key={i} className={"breadcrumb-item" + (this.state.stage == x ? ' active' : '')}>
                    {i < stages.indexOf(this.state.stage)
                      ? <div className="cursor-pointer" onClick={() => this.setState({ stage: x })}>
                        {toTitleCase(x)}
                      </div>
                      : <>
                        {toTitleCase(x)}
                      </>
                    }
                  </li>
                })
                }
              </ol>
            </nav>
            <h2 className="mb-3">{toTitleCase(this.state.stage)}</h2>
            {this.state.stage == 'address'
              ?
              <>
                {(this.state.displayAddAddress || this.state.displayEditAddress) &&
                  <div className="btn btn-secondary btn-back mb-3 ml-0" onClick={() => window.location.reload()}>Back</div>
                }
                <Addresses integrated={true} redirectTo={'.'} onClick={(x, val) => this.onClickAccount(x, val)} state={this.state} />
                {!this.state.displayAddAddress && !this.state.displayEditAddress &&
                  <div className="row">
                    {this.state.addresses.length
                      ? <div className="btn btn-primary" onClick={() => this.setState({ stage: 'payment' })}>Proceed to Payment</div>
                      : <div className="btn btn-primary disabled">Proceed to Payment</div>
                    }
                  </div>
                }
              </>
              :
              <>
              </>
            }
          </div>
        </section>
      </NavbarFooter>
    )
  }

}