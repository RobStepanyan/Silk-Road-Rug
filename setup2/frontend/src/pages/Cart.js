import React from 'react';
import NavbarFooter from '../components/NavbarFooter';
import { CartCard } from '../components/Cards';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'items': [
        <CartCard key="0" keyProp="0" heading="Name of the Rug" size="1' x 3'" style="Contemporary" color="White" price="$25,000.00" imgSrc="/static/frontend/img/rug.jpeg" />,
        <CartCard key="1" keyProp="1" heading="Name of the Rug" size="1' x 3'" style="Contemporary" color="White" price="$25,000.00" imgSrc="/static/frontend/img/rug.jpeg" />
      ]
    }
  }

  render() {
    return (
      <NavbarFooter>
        <section id="cart">
          <div className="container">
            <h1 className="text-center">Your Cart</h1>
            {this.state['items'].length > 0
              ? (
                this.state['items']
              )
              : (
                <div className="row mh-50">
                  <div className="col-12 m-auto">
                    <h2 className="text-center mt-n5">Your Cart is Empty</h2>
                    <p className="text-center">Add Rugs to your card so they will appear here.</p>
                  </div>
                </div>
              )
            }
          </div>
        </section >
      </NavbarFooter >
    )
  }
}