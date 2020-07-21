import React from 'react';
import $ from 'jquery';

export default class NavbarFooter extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
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

  render() {
    return (
      <>
        <nav className="navbar fixed-top">
          <div className="container-fluid">
            <div className="mr-auto">
              <button id="sidebarToggle" className="hamburger" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
            <a className="navbar-brand" href="#top">
              <img src="/static/frontend/img/srri-logo-reversed.png" alt="Silk Road Rug Logo" />
            </a>
            <div className="ml-auto d-flex">
              <a href="" className="navbar-icon">
                <svg focusable="false" drole="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path fill="currentColor"
                    d="M551.991 64H129.28l-8.329-44.423C118.822 8.226 108.911 0 97.362 0H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h78.72l69.927 372.946C150.305 416.314 144 431.42 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-17.993-7.435-34.24-19.388-45.868C506.022 391.891 496.76 384 485.328 384H189.28l-12-64h331.381c11.368 0 21.177-7.976 23.496-19.105l43.331-208C578.592 77.991 567.215 64 551.991 64zM240 448c0 17.645-14.355 32-32 32s-32-14.355-32-32 14.355-32 32-32 32 14.355 32 32zm224 32c-17.645 0-32-14.355-32-32s14.355-32 32-32 32 14.355 32 32-14.355 32-32 32zm38.156-192H171.28l-36-192h406.876l-40 192z"
                    className=""></path>
                </svg>
              </a>
              <a href="" className="navbar-icon account">
                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M256 32c61.8 0 112 50.2 112 112s-50.2 112-112 112-112-50.2-112-112S194.2 32 256 32m128 320c52.9 0 96 43.1 96 96v32H32v-32c0-52.9 43.1-96 96-96 85 0 67.3 16 128 16 60.9 0 42.9-16 128-16M256 0c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144S335.5 0 256 0zm128 320c-92.4 0-71 16-128 16-56.8 0-35.7-16-128-16C57.3 320 0 377.3 0 448v32c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-32c0-70.7-57.3-128-128-128z"
                    className=""></path>
                </svg>
              </a>
            </div>
          </div>

        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav className="sidenav accordion sidenav-dark" id="sidenavAccordion">
              <div className="sidenav-menu">
                <div className="nav">

                  <div className="sidenav-menu-heading">Shop</div>
                  <a className="nav-link collapsed" href="#">
                    Rugs
                  </a>

                  <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseServices" aria-expanded="false" aria-controls="collapseServices">
                    Services
                    <div className="sidenav-collapse-arrow"><svg className="svg-inline--fa fa-angle-down fa-w-10" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                      <path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
                    </svg></div>
                  </a>
                  <div className="collapse" id="collapseServices" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                    <nav className="sidenav-menu-nested nav">
                      <a className="nav-link" href="#">
                        <svg className="sidenav-svg" aria-hidden="true" focusable="false" data-prefix="fal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                          <path fill="#ffffff"
                            d="M638.26 15.53L628.3 3.02c-2.75-3.45-7.78-4.03-11.24-1.28L372.91 194.67l-45.44-57.08c-4.98-6.25-14.56-5.98-19.18.53l-48.62 68.59c-28.53.32-107.2 4.97-158.01 45.37C38.78 302.06 0 511.39 0 511.39c15.38.67 215.11 6.82 275.65-41.3 50.93-40.48 73.32-116.22 79.99-143.78l77.47-31.27c7.44-3 9.89-12.32 4.9-18.6l-45.17-56.75L636.98 26.76a7.985 7.985 0 0 0 1.28-11.23zM255.73 445.62c-26.7 21.22-109.44 34.4-215.93 34.4h-.6c4.06-17.75 8.96-36.82 14.4-55.92l68.79-54.68c4.96-3.94 1.22-11.88-4.97-10.57l-45.98 9.71c15.01-41.64 32.34-77.31 50.15-91.46 33.6-26.71 89.69-37.24 133.9-38.38l67.77 85.13c-7.19 27.54-27.17 89.69-67.53 121.77zm87.1-148.87l-56.94-71.53 28.4-40.47c2.3-3.28 7.11-3.43 9.61-.29l67.61 84.93c2.52 3.16 1.25 7.85-2.51 9.33l-46.17 18.03z">
                          </path>
                        </svg>
                        Rug Cleaning
                      </a>
                      <a className="nav-link" href="#">
                        <svg className="sidenav-svg" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M20 8h10c6.627 0 12 5.373 12 12v110.625C85.196 57.047 165.239 7.715 256.793 8.001 393.18 8.428 504.213 120.009 504 256.396 503.786 393.181 392.834 504 256 504c-63.926 0-122.202-24.187-166.178-63.908-5.113-4.618-5.354-12.561-.482-17.433l7.069-7.069c4.503-4.503 11.749-4.714 16.482-.454C150.782 449.238 200.935 470 256 470c117.744 0 214-95.331 214-214 0-117.744-95.331-214-214-214-82.862 0-154.737 47.077-190.289 116H180c6.627 0 12 5.373 12 12v10c0 6.627-5.373 12-12 12H20c-6.627 0-12-5.373-12-12V20c0-6.627 5.373-12 12-12z"
                            className=""></path>
                        </svg>
                        Rug Restoration
                      </a>
                    </nav>
                  </div>

                  {/* Other Section */}
                  <div className="sidenav-menu-heading">Other</div>
                  {/* Contact Us */}
                  <a className="nav-link collapsed" href="#">
                    Contact Us
                  </a>

                  {/* Helpful Links */}
                  <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLinks" aria-expanded="false" aria-controls="collapseLinks">
                    Helpful Links
                    <div className="sidenav-collapse-arrow"><svg className="svg-inline--fa fa-angle-down fa-w-10" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                      <path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
                    </svg></div>
                  </a>
                  <div className="collapse" id="collapseLinks" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                    <nav className="sidenav-menu-nested nav">
                      <a className="nav-link" href="#">
                        <svg className="sidenav-svg" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M20 8h10c6.627 0 12 5.373 12 12v110.625C85.196 57.047 165.239 7.715 256.793 8.001 393.18 8.428 504.213 120.009 504 256.396 503.786 393.181 392.834 504 256 504c-63.926 0-122.202-24.187-166.178-63.908-5.113-4.618-5.354-12.561-.482-17.433l7.069-7.069c4.503-4.503 11.749-4.714 16.482-.454C150.782 449.238 200.935 470 256 470c117.744 0 214-95.331 214-214 0-117.744-95.331-214-214-214-82.862 0-154.737 47.077-190.289 116H180c6.627 0 12 5.373 12 12v10c0 6.627-5.373 12-12 12H20c-6.627 0-12-5.373-12-12V20c0-6.627 5.373-12 12-12z"
                            className=""></path>
                        </svg>
                        Return Policy
                      </a>
                      <a className="nav-link" href="#">
                        <svg className="sidenav-svg" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                          <path fill="currentColor"
                            d="M280 192c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240zm352 192h-24V275.9c0-16.8-6.8-33.3-18.8-45.2l-83.9-83.9c-11.8-12-28.3-18.8-45.2-18.8H416V78.6c0-25.7-22.2-46.6-49.4-46.6H113.4C86.2 32 64 52.9 64 78.6V96H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H96V78.6c0-8.1 7.8-14.6 17.4-14.6h253.2c9.6 0 17.4 6.5 17.4 14.6V384H207.6C193 364.7 170 352 144 352c-18.1 0-34.6 6.2-48 16.4V288H64v144c0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16h195.2c-1.1 5.2-1.6 10.5-1.6 16 0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H632c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm-488 96c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm272-320h44.1c8.4 0 16.7 3.4 22.6 9.4l83.9 83.9c.8.8 1.1 1.9 1.8 2.8H416V160zm80 320c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-96h-16.4C545 364.7 522 352 496 352s-49 12.7-63.6 32H416v-96h160v96zM256 248v-16c0-4.4-3.6-8-8-8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8z"
                            className=""></path>
                        </svg>
                        Shipping Info
                      </a>
                      <a className="nav-link" href="#">
                        <svg className="sidenav-svg" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                          <path fill="currentColor"
                            d="M208 368.667V208c0-15.495-7.38-29.299-18.811-38.081C210.442 152.296 224 125.701 224 96c0-52.935-43.065-96-96-96S32 43.065 32 96c0 24.564 9.274 47.004 24.504 64H56c-26.467 0-48 21.533-48 48v48c0 23.742 17.327 43.514 40 47.333v65.333C25.327 372.486 8 392.258 8 416v48c0 26.467 21.533 48 48 48h144c26.467 0 48-21.533 48-48v-48c0-23.742-17.327-43.514-40-47.333zM128 32c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64 28.654-64 64-64zm88 432c0 8.837-7.163 16-16 16H56c-8.837 0-16-7.163-16-16v-48c0-8.837 7.163-16 16-16h24V272H56c-8.837 0-16-7.163-16-16v-48c0-8.837 7.163-16 16-16h104c8.837 0 16 7.163 16 16v192h24c8.837 0 16 7.163 16 16v48z"
                            className=""></path>
                        </svg>
                        About Us
                      </a>
                    </nav>
                  </div>

                  {/* Stay in Touch */}
                  <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTouch" aria-expanded="false" aria-controls="collapseTouch">
                    Stay in Touch
                    <div className="sidenav-collapse-arrow"><svg className="svg-inline--fa fa-angle-down fa-w-10" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                      <path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
                    </svg></div>
                  </a>
                  <div className="collapse" id="collapseTouch" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                    <nav className="sidenav-menu-nested nav">
                      <a className="nav-link" href="#">
                        <svg className="sidenav-svg-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
                        @SilkRoadRug
                      </a>
                      <a className="nav-link" href="#">
                        <svg className="sidenav-svg-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path
                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                        @SilkRoadRugInc
                      </a>
                    </nav>
                  </div>

                </div>
              </div>
            </nav>
          </div>

          <div id="layoutSidenav_content">
            {this.props.children}

            <footer>
              <div className="container">
                <div className="row">
                  <div className="col-auto">
                    <img src="/static/frontend/img/srri-logo-reversed-full-shrinked.png" width="195" alt="Silk Road Rug Logo" />
                  </div>
                  <div className="col-auto ">
                    <div className="footer-heading">Contact Information</div>
                    <ul>
                      <li>Studio + Workroom'</li>
                      <li>2881 W. Pico Blvd.</li>
                      <li>Los Angeles, Ca 90006</li>
                      <li><a href="mailto:info@silkroadruginc.com">Info@Silkroadruginc.Com</a></li>
                      <li><a href="tel:+14247775335">Tel: +1 (424) 777-5335</a></li>
                      <li><a href="tel:+12132154944">Tel: +1 (213) 215-4944</a></li>
                    </ul>
                  </div>
                  <div className="col-auto ">
                    <div className="footer-heading">Helpful Links</div>
                    <ul>
                      <li><a href="">Return Policy</a></li>
                      <li><a href="">Shipping Info</a></li>
                      <li><a href="">About Us</a></li>
                    </ul>
                  </div>
                  <div className="col-auto pr-0">
                    <div className="footer-heading">Stay in Touch</div>
                    <ul>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
                        <a href="">@SilkRoadRug</a>
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path
                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                        <a href="">@SilkRoadRugInc</a>
                      </li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>


                <hr />
                <div className="copy">@2020 Silk Road Rug Inc. All Rights Reserved.</div>
              </div>
            </footer>
          </div>
        </div>
      </>
    )
  }

}