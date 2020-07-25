import React from 'react';
import NavbarFooter from '../components/NavbarFooter';
import HelpfulLinksFooter from '../components/HelpfulLinksFooter';

export default function AboutUs(props) {
  return (
    <NavbarFooter>
      <section id="about">
        <div class="container">
          <h1>About Our Company</h1>

          <p>
            At Silk Road Rugs we specialize in fine antique, traditional, modern, custom rugs and European tapestries
            to meet your every interior design need. We work with the trade, architects and designers to provide the finest
            products and service for their residential and commercial projects. We also provide complimentary consultation
            to assist in the selection and measurement process to find the right piece for any space.
            Our inventory is complete with a vast collection of rugs in-stock.
          </p>

          <h2>Our Mission</h2>
          <p>
            We are here to assist you with the entire process to fulfill your vision of the ideal room. From selecting the right piece to the maintenance and preservation for the years to come.
            In addition to retail, we also offer cleaning and restoration to clientele who are only interested such services only. We understand your Oriental Rug and Tapestry is an important investment that will last for generations if cared for properly.
            To protect your heirloom, we will properly dust, hand-wash, spot clean any and all stains, including fresh wine and urine stains, clearing the rug of dirt particles to help restore rug's luster.
            While handwoven Oriental Rugs are famous for their durability, some older carpets may need restoration. Restoration differs from repair in its efforts to accurately duplicate the materials and construction of the original piece. Worn areas can be rewoven, frayed ends can be secured, and the rug can be stitched or tinted.
            Our specialists are trained to work on antique and new Oriental Rugs and Tapestries with utmost skill, patience and attention to detail. We will help restore your rug's beauty and elegance to its past glories so it may be cherished by present and future generations.
          </p>

          <HelpfulLinksFooter />
        </div>
      </section>
    </NavbarFooter>
  )
}