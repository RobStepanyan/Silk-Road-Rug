import React from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import HelpfulLinksFooter from '../../components/HelpfulLinksFooter';

export default function AboutUs(props) {
  return (
    <NavbarFooter>
      <section id="shipping">
        <div className="container">
          <h1>Shipping Info</h1>

          <h2>Domestic Shipping</h2>
          <p className="style-2 mb-0">Due to the high value of our rugs, Flat-Rate of</p>
          <ul className="text-white style-default">
            <li>$50 under 25lbs</li>
            <li>$100 26lbs-50lbs</li>
            <li>$150 51lbs-75lbs</li>
          </ul>
          <p className="style-2">
            On all orders shipped via UPS or FedEx ground to addresses within the USA and Canada.
            For large heavy rugs, please request shipping quote prior to purchase.
          </p>

          <h2>Insurance</h2>
          <p className="style-2">
            Please note insurance is not included unless client specifies and requests quote.
            Silk Road Rug, Inc. is not responsible for lost or stolen merchandise once package has been handed over to courier.
          </p>

          <h2>Expedited Shipping</h2>
          <p className="style-2">
            Next-Day or Two-Day services are available for an additional fee.
            Please contact us to inquire on expedited shipping prior to purchase.
          </p>

          <h2>Signature Release Required</h2>
          <p className="style-2">
            All orders will be shipped with <strong>signature release required</strong> unless you notify us otherwise.
          </p>

          <h2>Delivery Time</h2>
          <p className="style-2">
            We ship promptly! Delivery time to the West Coast is 1 – 3 days and elsewhere one week.
            Check your inbox for an email directly from UPS or FedEx with tracking information.
          </p>

          <h2>International Shipment</h2>
          <p className="style-2">
            For our International customers most items can be shipped.
            Customs duties or VAT is the responsibility of the customer.
            Contact us for international shipping quotes prior to purchase.
          </p>

          <h2>Will-Call</h2>
          <p className="style-2">
            Local will-call pick-up is available without charge.
          </p>

          <h2>White Glove Delivery</h2>
          <p className="style-2">
            White Glove delivery and installation is available, please email to inquire pricing for your area.
          </p>

          <HelpfulLinksFooter />
        </div>
      </section>

    </NavbarFooter>
  )
}