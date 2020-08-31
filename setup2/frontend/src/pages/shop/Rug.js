import React from 'react';
import { apiURLs, styles } from '../../other/variables';
import { formatPrice, formatSize } from '../../other/functions';
import axios from 'axios';
import NavbarFooter from '../../components/NavbarFooter';
import Loading from '../../components/Loading';
import { RadioGroupWithPrice } from '../../components/Form';

export default class Rug extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = {
      data: null,
      price_before: 0,
      price_after: 0,
      selectedImg: 0,
      // Vrtn - Rug Variation
      selectedVrtn: 0,
    }
  }

  getData() {
    axios({
      method: 'get',
      url: apiURLs['rugById'](this.id),
    })
      .then(response => {
        this.setState({
          data: response.data[0],
          price_before: parseInt(response.data[0].base_price_before_sale),
          price_after: parseInt(response.data[0].base_price_after_sale)
        })
        response.data[0].rug_variations.map((vrtn, i) => {
          if (vrtn.is_sample) {
            this.setState({ selectedVrtn: i + 1 })
          }
        })
      })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    let data, price_before, price_after, items, handleChangeVrtn
    if (this.state.data) {
      data = this.state.data
      price_before = this.state.price_before;
      price_after = this.state.price_after;

      if (this.state.data.rug_variations.length > 1) {
        items = this.state.data.rug_variations.map((vrtn, i) => {
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
            price_before: this.state.data.rug_variations[id].price_usd,
            price_after: this.state.data.rug_variations[id].price_usd_after_sale,
          })
        }
      }
    }

    return (
      <NavbarFooter>
        {data
          ? (
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <img className="w-100 transition" src={data.rug_images[this.state.selectedImg]}></img>
                    <hr className="my-2" />
                    <RugThumbnails
                      onClick={(i) => this.setState({ 'selectedImg': i })}
                      images={data.rug_images}
                      selectedImg={this.state.selectedImg}
                    />
                  </div>
                  <div className="card col-12 col-sm-6">
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
                    <h4>Details</h4>
                    <ul className="style-default">
                      <li>Style: {styles[data.style]}</li>
                      {data.rug_variations.length == 1 &&
                        <li>Size: {formatSize(data.rug_variations[0])}</li>
                      }
                      <li>SKU: {data.sku}</li>
                    </ul>
                    {data.rug_variations.length > 1 &&
                      <>
                        <h4>Sizes</h4>
                        <RadioGroupWithPrice
                          name="sizes" priceSign=""
                          items={items} selectedId={this.state.selectedVrtn}
                          onChange={(id) => handleChangeVrtn(id)} />
                      </>
                    }
                    <div className="row">
                      <a href="" className="btn card-btn btn-primary">Buy Now</a>
                      <a href="" className="btn card-btn btn-secondary">Add to Cart</a>
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
            <img key={i} src={src}
              onClick={() => props.onClick(i)}
              className={"thumbnail" + (i == props.selectedImg ? " selected" : "")}
            ></img>
          )
        })}
      </div>
    </div>
  )
}