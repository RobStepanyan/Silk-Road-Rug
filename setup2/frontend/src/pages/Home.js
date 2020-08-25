import React, { Component } from 'react';
import NavbarFooter from '../components/NavbarFooter';
import Card, { ShopCard } from '../components/Cards';
import { apiURLs } from '../other/variables';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null }
  }

  initCarousel() {
    $('.carousel').slick({
      autoplay: true,
      autoplaySpeed: 5000,
      adaptiveHeight: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
    })

    $('.carousel-2').slick({
      // autoplay: true,
      // autoplaySpeed: 2000,
      adaptiveHeight: true,
      slidesToShow: 4,
      slidesToScroll: 3,
      centerMode: true,

      responsive: [
        {
          breakpoint: 787,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ],
    })
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
              : <div className="row carousel-2">
                {this.state.data.map((data, i) => {
                  return <ShopCard key={i} id={data.id} heading={data.name} imgSrc={data.rug_images[0]} imgAlt={'Rug Image'}
                    price={[data.base_price_before_sale, data.base_price_after_sale]} />
                })}
                {this.initCarousel()}
              </div>
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
            <div className="carousel">
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
            </div>
          </div>
        </section>
      </NavbarFooter>
    )
  }
}