import React, { Component } from 'react';
import NavbarFooter from '../components/NavbarFooter';
import Card, { ShopCard } from '../components/Cards';
import { apiURLs, slickCarouselSettings } from '../other/variables';
import axios from 'axios';
import Slider from 'react-slick';
import { removeJWTCookies } from '../other/functions';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { data: null }
  }

  componentWillMount() {
    if (this.props.location.props && this.props.location.props.logOut) { removeJWTCookies() }
    axios({
      method: 'get',
      url: apiURLs['listRugs'],
    })
      .then(response => this.setState({ data: response.data }))
  }

  render() {
    let alert = this.props.location.props && this.props.location.props.alert ? this.props.location.props.alert : false
    return (
      <NavbarFooter>
        <section className="section-landing">
          <div className="container">
            {alert &&
              <div className={"alert" + (alert.isError ? " danger" : " success")}>{alert.msg}</div>
            }
            <div className="landing">
              <div className="sub-heading">
                Rugs Sales, Cleaning and Restoraton
            </div>
              <div className="heading">
                We are Fulfilling Your Vision of the Ideal Room
            </div>
              <div className="d-flex">
                <a href="/shop" className="btn btn-primary ml-0">Our Shop</a>
                <a href="#services" className="btn btn-secondary">Services</a>
              </div>
            </div>

            <div className="bg-parallax"></div>
            <a href='#shop' className="angle">
              <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"></path></svg>
            </a>
          </div>
        </section>

        <section id="shop">
          <div className="container">
            <h1 className="center">Shop</h1>
            <hr />
            <p>Find a perfect rug</p>
            {!this.state.data || this.state.data.length === 0
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
                <img src="../img/interior/6b2a2570sm_orig.jpg" alt="" />
              </div>
              <div>
                <img src="../img/interior/6b2a3049sm_orig.jpg" alt="" />
              </div>
              <div>
                <img src="../img/interior/mckenzie-170_orig.jpg" alt="" />
              </div>
              <div>
                <img src="../img/interior/screen-shot-2017-11-19-at-6-20-21-pm_orig.png" alt="" />
              </div>
            </Slider>
          </div>
        </section>
      </NavbarFooter >
    )
  }
}