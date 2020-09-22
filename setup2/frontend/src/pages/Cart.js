import React from 'react';
import NavbarFooter from '../components/NavbarFooter';
import { CartCard } from '../components/Cards';
import { toCamelCase, calculateAdditionalCosts, calculatePriceSum, formatPrice, isAuthed, formatSize } from '../other/functions';
import { apiHeaders, apiURLs, cartCardInputsOrder, dummyData, styles } from '../other/variables';
import Loading from '../components/Loading';
import axios from 'axios';

export default class Cart extends React.Component {
  constructor() {
    super();
    this.handleRadioWithPriceChange = this.handleRadioWithPriceChange.bind(this)
    this.state = {
      additionalCosts: {},
      selectedRadios: {},
      selectedCheckboxes: {},
      itemsQuanity: 4,
      isAuthed: false,
      data: [],
    }
  }

  handleRadioWithPriceChange(keyProp, name, id) {
    let { selectedRadios } = this.state;
    selectedRadios[keyProp][name] = id;

    this.setState({
      selectedRadios: selectedRadios,
      additionalCosts: calculateAdditionalCosts(this.state.selectedRadios, this.state.selectedCheckboxes, this.state.data)
    })
  }

  handleCheckboxWithPriceChange(keyProp, name, id) {
    let { selectedCheckboxes } = this.state;

    selectedCheckboxes[keyProp][name].includes(id)
      ? selectedCheckboxes[keyProp][name].splice(selectedCheckboxes[keyProp][name].indexOf(id), 1) // remove id from the list
      : selectedCheckboxes[keyProp][name].push(id)

    this.setState({
      selectedCheckboxes: selectedCheckboxes,
      additionalCosts: calculateAdditionalCosts(this.state.selectedRadios, this.state.selectedCheckboxes, this.state.data)
    })
  }

  handleClickRemove(key) {
    this.setState({ loading: true })
    axios({
      method: 'delete',
      headers: apiHeaders.authorization,
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
      headers: apiHeaders.authorization,
      url: apiURLs.user.cart.list,
    })
      .then(res => {
        let { data } = res

        let { additionalCosts, selectedRadios, selectedCheckboxes } = this.state;
        for (let i = 0; i <= data.length - 1; i++) {
          additionalCosts[i] = 0
          selectedRadios[i] = {}
          selectedCheckboxes[i] = {}
          selectedRadios[i]['shipping'] = 0 //iterate through data and check if radio's first item is not disabled
          selectedCheckboxes[i]['additional'] = [] // also extract shipping & additioal from data
        }

        this.setState({
          data,
          loading: false,
          selectedRadios: selectedRadios,
          selectedCheckboxes: selectedCheckboxes,
          additionalCosts: additionalCosts,
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
            <h1 className="text-center">Your Cart</h1>
            {this.state.isAuthed
              ? <>{this.state.data.length
                ? <>
                  <div className="cart-header">
                    <h2>Order Total</h2>
                    <ul>
                      {this.state.data.map((data, i) => {
                        return (
                          <li key={i}>
                            <div className="col p-0">
                              {data.name}
                              <span className="price">
                                {formatPrice(data.base_price)}
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
                  {data.map((data, i) => {
                    return (
                      <CartCard
                        key={String(i)} keyProp={String(i)}
                        name={data.name} size={formatSize(data)} style={styles[data.style]}
                        sku={data.sku} color={data.color} image={data.image}
                        price={data.base_price} additionalCosts={this.state.additionalCosts[i]}
                        inputs={inputs[i]} selectedId={this.state.selectedRadios[String(i)]} selectedIds={this.state.selectedCheckboxes[String(i)]}
                        onClickRemove={() => this.handleClickRemove(i)}
                        onChangeRadio={(keyProp, name, id) => this.handleRadioWithPriceChange(keyProp, name, id)}
                        onChangeCheckbox={(keyProp, name, id) => this.handleCheckboxWithPriceChange(keyProp, name, id)} />
                    )
                  })}
                </>
                : <div className="row mh-50">
                  <div className="col-12 m-auto">
                    <h2 className="text-center mt-n5">Your Cart is Empty</h2>
                    <p className="text-center">Add Rugs to your card so they will appear here.</p>
                    <div className="d-flex justify-content-center">
                      <a href="/shop" className="btn btn-primary">Go to Shop</a>
                    </div>
                  </div>
                </div>
              } </>
              : <div className="row mh-50">
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