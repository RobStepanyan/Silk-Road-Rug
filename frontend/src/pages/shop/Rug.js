import React from 'react';
import { apiHeaders, apiURLs } from '../../other/variables';
import { formatPrice, formatRugStyle, formatSize, isAuthed } from '../../other/functions';
import axios from 'axios';
import NavbarFooter from '../../components/NavbarFooter';
import Loading from '../../components/Loading';
import { RadioGroupWithPrice } from '../../components/Form';
import { Redirect } from 'react-router-dom';
import Error from '../../pages/Error';

export default class Rug extends React.Component {
  constructor(props) {
    super();
    this.id = props.match.params.id;
    this.state = {
      data: null,
      price_before: 0,
      price_after: 0,
      selectedImg: 0,
      // Vrtn - Rug Variation
      selectedVrtn: 0,
      alert: null,
      loading: false,
      redirectNow: false,
      redirectTo404: false,
      quantitySelected: 1,
    }

    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: apiURLs.rug.retrieve(this.id),
    })
      .then(res => {
        this.setState({
          data: res.data[0],
          price_before: parseInt(res.data[0].base_price_before_sale),
          price_after: parseInt(res.data[0].base_price_after_sale)
        })
        res.data[0].variations.forEach((vrtn, i) => {
          if (vrtn.is_sample) {
            this.setState({ selectedVrtn: i + (res.data[0].variations.length > 1 ? 1 : 0) })
          }
        })
      })
      .catch(() => this.setState({ redirectTo404: true }))
  }

  handleAddToCart() {
    this.setState({ loading: true })
    if (!isAuthed()) { this.setState({ redirectNow: true }) }
    axios({
      method: 'post',
      headers: { ...apiHeaders.authorization, ...apiHeaders.csrf },
      url: apiURLs.user.cart.create,
      data: {
        rug: this.state.data.id,
        rug_variation: this.state.data.variations[this.state.selectedVrtn].id,
        quantity: this.state.quantitySelected,
      }
    })
      .then(res => {
        if (res.data.msg) {
          this.setState({ alert: 'Added to Cart' })
        } else if (res.data.error && res.data.error === 'Object already exists.') {
          this.setState({ alert: 'Already in Cart' })
        }
        this.setState({ loading: false })
      })
      .catch(this.setState({ loading: false }))
    window.scrollTo(0, 0);
  }

  render() {
    let data, price_before, price_after, items, handleChangeVrtn
    if (this.state.data) {
      data = this.state.data
      price_before = this.state.price_before;
      price_after = this.state.price_after;

      if (this.state.data.variations.length > 1) {
        items = this.state.data.variations.map((vrtn, i) => {
          let obj = {}
          obj['label'] = formatSize(vrtn)
          obj['price'] = [vrtn.price_usd, vrtn.price_usd_after_sale]
          obj['with_sale'] = vrtn.price_usd_after_sale ? true : false
          obj['is_sample'] = vrtn.is_sample
          return obj
        })

        handleChangeVrtn = (id) => {
          this.setState({
            selectedVrtn: id,
            price_before: this.state.data.variations[id].price_usd,
            price_after: this.state.data.variations[id].price_usd_after_sale,
          })
        }
      }
    }

    if (this.state.loading) { return <Loading /> }
    if (this.state.redirectNow) { return <Redirect to='/login' /> }
    if (this.state.redirectTo404) { return <Error error={404} /> }
    return (
      <NavbarFooter>
        {data
          ? (
            <section>
              <div className="container">
                {this.state.alert &&
                  <div className="alert success">{this.state.alert}</div>
                }
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <img alt="Selected Thumbnail" className="w-100 transition" src={data.images[this.state.selectedImg].image}></img>
                    <hr className="my-2" />
                    <RugThumbnails
                      onClick={(i) => this.setState({ 'selectedImg': i })}
                      images={data.images}
                      selectedImg={this.state.selectedImg}
                    />
                  </div>
                  <div className="card col-12 col-sm-6 h-100">
                    <h2>{data.name}</h2>
                    {!price_after
                      ? <h3 className="price">{formatPrice(price_before)}</h3>
                      : <div className="d-flex">
                        <h3 className="price mr-2">{formatPrice(price_after)}</h3>
                        <h3 className="price discounted">{formatPrice(price_before)}</h3>
                      </div>
                    }
                    {data.desc &&
                      <p>{data.desc}</p>
                    }
                    <hr className="my-2" />
                    {/* Details w/ or w/o Sizes */}
                    <h4>Details</h4>
                    <ul className="style-default">
                      <li>Style: {formatRugStyle(data.groups)}</li>
                      {data.variations.length === 1 &&
                        <li>Size: {formatSize(data.variations[0])}</li>
                      }
                      <li>SKU: {data.sku}</li>
                    </ul>
                    {data.variations.length > 1 &&
                      <>
                        <h4>Sizes</h4>
                        <RadioGroupWithPrice
                          name="sizes" priceSign=""
                          items={items} selectedId={this.state.selectedVrtn}
                          onChange={(id) => handleChangeVrtn(id)} />
                      </>
                    }
                    {/* *********************** */}
                    <h4 className="mb-3">Quantity</h4>
                    <input type='number' value={this.state.quantitySelected}
                      min={1} max={data.variations[this.state.selectedVrtn].quantity}
                      onChange={(e) => this.setState({ quantitySelected: parseInt(e.target.value) })} />
                    <small className="m-0 mb-1">{data.variations[this.state.selectedVrtn].quantity} Available</small>
                    <div className="row">
                      <div onClick={this.handleAddToCart} className="btn card-btn btn-primary">Add to Cart</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
          : <Loading />
        }
      </NavbarFooter>
    )
  }
}

function RugThumbnails(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        {props.images.map((src, i) => {
          return (
            <img alt="Rug Thumbnail" key={i} src={src.image}
              onClick={() => props.onClick(i)}
              className={"thumbnail" + (i === props.selectedImg ? " selected" : "")}
            ></img>
          )
        })}
      </div>
    </div>
  )
}