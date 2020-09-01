import React, { Component } from 'react';
import NavbarFooter from '../components/NavbarFooter';
import Card, { ShopCard } from '../components/Cards';
import { apiURLs, slickCarouselSettings } from '../other/variables';
import axios from 'axios';
import Slider from 'react-slick';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null }
  }

  componentWillMount() {
    axios({
      method: 'get',
      url: apiURLs['listRugs'],
    })
      .then(response => this.setState({ data: response.data }))
  }

  render() {
    return (
      <NavbarFooter>
        <section>
          <div className="container">
            {this.props.alert &&
              <div className={"alert" + (this.props.alert.isError ? " danger" : " success")}>{this.props.alert.msg}</div>
            }
            <div className="landing col-lg-9">
              <div className="sub-heading">
                Rugs Sales, Cleaning and Restoraton
            </div>
              <div className="heading">
                We are Fulfilling Your Vision of the Ideal Room
            </div>
            </div>

            <div className="d-flex">
              <a href="/shop" className="btn btn-primary ml-0">Our Shop</a>
              <a href="#services" className="btn btn-secondary">Services</a>
            </div>

            <div className="bg-parallax"></div>
          </div>
        </section>

        <section id="shop">
          <div className="container">
            <h1 className="center">Shop</h1>
            <hr />
            <p>Find a perfect rug</p>
            {!this.state.data || this.state.data.length == 0
              ? <h3 className="center">Error Occured</h3>
              : <Slider {...slickCarouselSettings[1]} className="row mb-3">
                {this.state.data.map((data, i) => {
                  return <ShopCard notResponsive={true} key={i} id={data.id} heading={data.name} imgSrc={data.rug_images[0]} imgAlt={'Rug Image'}
                    price={[data.base_price_before_sale, data.base_price_after_sale]} />
                })}
              </Slider>
            }
            <div className="row justify-content-center">
              <a className="btn btn-primary" href="/shop">Open Shop</a>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="container">
            <h1 className="center m-0">I Want to Get...</h1>

            <hr />
            <p>Services</p>

            <div className="row justify-content-center">
              <div className="col-12 col-md-6 col-lg-4">
                <Card heading="My Rug Cleaned"
                  text="To protect your heirloom, we offer professional cleaning every 2 to 3 years and more often if it’s subject to frequent heavy traffic or accidents. Dirt particles and pet urine can cause the rug's fibers to become brittle"
                  withBtn
                  btnHref="/services/rug-cleaning"
                  btnText="Learn More" />
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <Card heading="My Rug Restored"
                  text="While handwoven Oriental Rugs are famous for their durability, some older carpets may need restoration. Restoration differs from repair in its efforts to accurately duplicate the materials and construction"
                  withBtn
                  btnHref="/services/rug-restoration"
                  btnText="Learn More" />
              </div>

            </div>
          </div>
        </section>

        <section id="gallery">
          <div className="container">
            <h1 className="center">Gallery</h1>

            <hr />
            <p>Swipe for photos</p>
            <Slider {...slickCarouselSettings[0]}>
              <div>
                <img src="/static/frontend/img/interior/6b2a2570sm_orig.jpg" alt="" />
              </div>
              <div>
                <img src="/static/frontend/img/interior/6b2a3049sm_orig.jpg" alt="" />
              </div>
              <div>
                <img src="/static/frontend/img/interior/mckenzie-170_orig.jpg" alt="" />
              </div>
              <div>
                <img src="/static/frontend/img/interior/screen-shot-2017-11-19-at-6-20-21-pm_orig.png" alt="" />
              </div>
            </Slider>
          </div>
        </section>
      </NavbarFooter>
    )
  }
}