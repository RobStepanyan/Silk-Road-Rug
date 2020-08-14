import React, { Component } from 'react';
import NavbarFooter from '../components/NavbarFooter';
import Card, { ShopCard } from '../components/Cards';

export default class Home extends Component {
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
            <h2 className="text-center">Antique</h2>
            <div className="row carousel-2">
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />

            </div>
            <h2 className="text-center">Contemporary</h2>
            <div className="row carousel-2">
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />
              <ShopCard imgSrc="/static/frontend/img/rug.jpeg" imgAlt="Rug Image" heading="Rug's Name but longer" price="$25,000.00" />

            </div>
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