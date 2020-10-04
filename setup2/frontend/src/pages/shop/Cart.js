import React from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import { CartCard } from '../../components/Cards';
import { toCamelCase, calculateAdditionalCosts, calculatePriceSum, formatPrice, isAuthed, formatSize } from '../../other/functions';
import { apiHeaders, apiURLs, cartCardInputsOrder, dummyData, styles } from '../../other/variables';
import Loading from '../../components/Loading';
import axios from 'axios';

export default class Cart extends React.Component {
  constructor() {
    super();
    this.handleRadioWithPriceChange = this.handleRadioWithPriceChange.bind(this)
    this.setAdditionalCosts = this.setAdditionalCosts.bind(this)
    this.state = {
      additionalCosts: {},
      selectedRadios: {},
      selectedCheckboxes: {},
      selectedNumbers: {},
      itemsQuanity: 4,
      isAuthed: false,
      data: [],
      toggled: false,
      loading: true,
    }
  }

  setAdditionalCosts() {
    this.setState({ additionalCosts: calculateAdditionalCosts(this.state.selectedNumbers, this.state.selectedRadios, this.state.selectedCheckboxes, this.state.data) })
  }

  handleRadioWithPriceChange(keyProp, name, id) {
    this.setState({ loading: true })
    let { selectedRadios } = this.state;
    selectedRadios[keyProp][name] = id;

    this.setState({ selectedRadios })
    this.setAdditionalCosts()
    this.sendPartialUpdate(keyProp)
  }

  handleCheckboxWithPriceChange(keyProp, name, id) {
    this.setState({ loading: true })
    let { selectedCheckboxes } = this.state;

    selectedCheckboxes[keyProp][name].includes(id)
      ? selectedCheckboxes[keyProp][name].splice(selectedCheckboxes[keyProp][name].indexOf(id), 1) // remove id from the list
      : selectedCheckboxes[keyProp][name].push(id)

    this.setState({ selectedCheckboxes })
    this.setAdditionalCosts()
    this.sendPartialUpdate(keyProp)
  }

  handleNumberChange(keyProp, val) {
    this.setState({ loading: true })
    let { selectedNumbers } = this.state
    selectedNumbers[keyProp] = parseInt(val)
    this.setState({ selectedNumbers })
    this.setAdditionalCosts()
    this.sendPartialUpdate(keyProp)
  }

  sendPartialUpdate(keyProp) {
    this.setState({ loading: true })
    // send update api request to update CartItem on state change
    let pk = this.state.data[keyProp].id

    let { selectedCheckboxes, selectedRadios, selectedNumbers } = this.state
    selectedCheckboxes = selectedCheckboxes[keyProp]
    selectedRadios = selectedRadios[keyProp]
    let quantity = selectedNumbers[keyProp]

    let selecteds = []
    Object.entries(selectedRadios).map(entry => {
      let [key, val] = entry
      selecteds.push(Object.values(cartCardInputsOrder[key])[val])
    })
    Object.entries(selectedCheckboxes).map(entry => {
      let [key, val] = entry
      val.map(selCheck => {
        selecteds.push(Object.values(cartCardInputsOrder[key])[selCheck])
      })
    })

    axios({
      method: 'patch',
      headers: { ...apiHeaders.authorization, ...apiHeaders.csrf },
      url: apiURLs.user.cart.partialUpdate(pk),
      data: {
        selecteds,
        quantity
      }
    })
      .then(this.setState({ loading: false }))
    // .catch(window.location.reload())
  }

  handleClickRemove(key) {
    this.setState({ loading: true })
    axios({
      method: 'delete',
      headers: { ...apiHeaders.authorization, ...apiHeaders.csrf },
      url: apiURLs.user.cart.delete(this.state.data[key].id),
    }).then(() => {
      let { data } = this.state
      data.splice(key, 1)
      this.setState({ data, loading: false })
    })
  }

  componentWillMount() {
    let isAuth = isAuthed()
    this.setState({ loading: true, isAuthed: isAuth })

    axios({
      method: 'get',
      headers: { ...apiHeaders.authorization, ...apiHeaders.csrf },
      url: apiURLs.user.cart.list,
    })
      .then(res => {
        let { data } = res

        let { additionalCosts, selectedRadios, selectedCheckboxes, selectedNumbers } = this.state;
        for (let i = 0; i <= data.length - 1; i++) {
          selectedNumbers[i] = 1
          additionalCosts[i] = 0
          selectedRadios[i] = {}
          selectedCheckboxes[i] = {}
        }

        let types = {
          shipping: 'radio',
          additional: 'checkbox',
        }

        // Setting selected Input using CartItem's selecteds field
        data.map((cartItem, i) => {
          Object.entries(types).map(entry => {
            let [key, val] = entry
            if (val == 'radio') {
              selectedRadios[i][key] = 0 // setting default value
            } else {
              selectedCheckboxes[i][key] = []
            }
            cartItem.selecteds.map(sel => {
              if (Object.values(cartCardInputsOrder[key]).includes(sel)) {
                if (val == 'radio') {
                  selectedRadios[i][key] = Object.values(cartCardInputsOrder[key]).indexOf(sel)
                } else {
                  selectedCheckboxes[i][key].push(Object.values(cartCardInputsOrder[key]).indexOf(sel))
                }
              }
            })
            selectedNumbers[i] = cartItem.quantitySelected
          })
        })

        additionalCosts = calculateAdditionalCosts(selectedNumbers, selectedRadios, selectedCheckboxes, data)

        this.setState({
          data,
          loading: false,
          selectedRadios,
          selectedCheckboxes,
          additionalCosts,
          selectedNumbers,
        })
      })
      .catch(err => {
        if (err.response.status == 401 && isAuth) {
          window.location.reload()
        } else {
          this.setState({ loading: false })
        }
      })
  }

  render() {
    const data = this.state.data

    const inputs = data.map(x => {
      return ([
        {
          inputType: 'radio', heading: 'Shipping Method', name: 'shipping', 'items':
            Object.entries(cartCardInputsOrder['shipping']).map(shMthd => {
              return { label: shMthd[0], price: x[shMthd[1]] }
            })
        },
        {
          inputType: 'checkbox', heading: 'Additional Services', name: 'additional', 'items':
            Object.entries(cartCardInputsOrder['additional']).map(add => {
              return { label: add[0], price: x[add[1]] }
            })
        }
      ])
    })

    { if (this.state.loading) { return <Loading /> } }
    return (
      <NavbarFooter>
        <section id="cart">
          <div className="container">
            <h1 className="text-center">Your Cart ({this.state.data.length ? this.state.data.length : 0})</h1>
            {this.state.isAuthed
              ? <>{this.state.data.length
                ? <div className="row mh-50">
                  <div className="col">
                    {data.map((data, i) => {
                      return (
                        <CartCard
                          key={String(i)} keyProp={String(i)} rugId={data.rug_id}
                          name={data.name} size={formatSize(data)} style={styles[data.style]}
                          sku={data.sku} color={data.color} image={data.image} quantityAvailable={data.quantity} quantitySel={this.state.selectedNumbers[i]}
                          price_before={data.price_usd} price_after={data.price_usd_after_sale} additionalCosts={this.state.additionalCosts[i]}
                          inputs={inputs[i]} selectedId={this.state.selectedRadios[String(i)]} selectedIds={this.state.selectedCheckboxes[String(i)]}
                          onClickRemove={() => this.handleClickRemove(i)}
                          onChangeNumber={(keyProp, val) => this.handleNumberChange(keyProp, val)} selectedNumber={this.state.selectedNumbers[i]}
                          onChangeRadio={(keyProp, name, id) => this.handleRadioWithPriceChange(keyProp, name, id)}
                          onChangeCheckbox={(keyProp, name, id) => this.handleCheckboxWithPriceChange(keyProp, name, id)} />
                      )
                    })}
                  </div>

                  <div className="col-auto p-0">
                    <div onClick={() => this.setState({ toggled: !this.state.toggled })} id="checkoutToggle"
                      className={this.state.toggled ? 'toggled' : ''}><h3>Checkout</h3></div>
                    <div className={"checkout-sidebar cart-header" + (this.state.toggled ? ' toggled' : '')}>
                      <div onClick={() => this.setState({ toggled: !this.state.toggled })} className="svg-btn">
                        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"></path></svg>
                      </div>
                      <h3>Order Total</h3>
                      <ul>
                        {this.state.data.map((data, i) => {
                          return (
                            <li key={i}>
                              <div className="col p-0">
                                {data.name + (this.state.selectedNumbers[i] > 1 ? ` (x${this.state.selectedNumbers[i]})` : '')}
                                <span className="price">
                                  {formatPrice((data.price_usd_after_sale ? data.price_usd_after_sale : data.price_usd) * this.state.selectedNumbers[i])}
                                </span>
                              </div>
                            </li>
                          )
                        })
                        }
                      </ul>
                      <hr />
                      <div className="total">
                        <p className="price">{formatPrice(calculatePriceSum(this.state.data, this.state.selectedNumbers, 0))}</p>
                        <p className="price">{'+' + formatPrice(calculatePriceSum(0, this.state.selectedNumbers, this.state.additionalCosts))}</p>
                        <h3 className="price">{formatPrice(calculatePriceSum(this.state.data, this.state.selectedNumbers, this.state.additionalCosts))}</h3>
                      </div>
                      <div className="row">
                        <a href="/checkout" className="btn btn-primary ml-auto">Proceed to Checkout</a>
                      </div>

                    </div>
                  </div>
                </div>
                :
                <div className="row mh-50">
                  <div className="col-12 m-auto">
                    <h2 className="text-center mt-n5">Your Cart is Empty</h2>
                    <p className="text-center">Add Rugs to your card so they will appear here.</p>
                    <div className="d-flex justify-content-center">
                      <a href="/shop" className="btn btn-primary">Go to Shop</a>
                    </div>
                  </div>
                </div>
              } </>
              :
              <div className="row mh-50">
                <div className="col-12 m-auto">
                  <h2 className="text-center mt-n5 mb-3">Please Authorize to Continue</h2>
                  <div className="d-flex justify-content-center">
                    <a href="/signup" className="btn btn-primary">Sign Up</a>
                    <a href="/login" className="btn btn-secondary">Log In</a>
                  </div>
                </div>
              </div>
            }
          </div>
        </section >
      </NavbarFooter >
    )
  }
}