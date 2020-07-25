import React from 'react';
import NavbarFooter from '../components/NavbarFooter';
import HelpfulLinksFooter from '../components/HelpfulLinksFooter';

export default function AboutUs(props) {
  return (
    <NavbarFooter>
      <section>
        <div class="container">
          <h1>Return Policy</h1>
          <p>All sales are final, unless we shipped incorrect rug. Please ask questions and request detail images before purchase.</p>
          <div class="disclaimer">
            The Above Described Hand Made Goods Are Sold “As-Is” With Any Imperfections,
            At Buyer’S Risk. Except As Expressly Stated Above, Seller Makes No Representations.
            Seller Disclaims All Warranties, Express Or Implied, Including Merchantibility And Fitness For A Particular Purpose.
          </div>
          <p>
            Delinquent payments shall bear interest at the maximum legal rate. Seller shall be entitled to recover from Buyer reasonable attorneys’ fees and costs incurred by Seller in enforcing this agreement.
          </p>
          <div class="note">
            For all in-store purchases please read your receipt for our exchange policy.
          </div>
          <h2 class="mt-3">Consignment Agreement</h2>
          <p>
            We consign on approval for 48 hours upon receipt of merchandise, please contact our office with inquiries.
          </p>

          <HelpfulLinksFooter />
        </div>
      </section>
    </NavbarFooter>
  )
}