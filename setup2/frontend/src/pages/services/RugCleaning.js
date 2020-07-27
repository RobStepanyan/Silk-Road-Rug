import React, { useEffect } from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import { ZLikeRow1, ZLikeRow2 } from '../../components/ZLikeRow';

export default class RugCleaning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'items': [],
    }
    this.updateItems = this.updateItems.bind(this);
  };

  updateItems() {
    let text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry' s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;
    let items = []

    for (let i = 0; i < 5; i++) {
      if (window.innerWidth <= 576) {
        items.push(<ZLikeRow2 key={i} heading='Lorem Ipsum' text={text} imgSrc='/static/frontend/img/dummy-img.jpg' />);
      } else {
        if (i % 2 == 0) {
          items.push(<ZLikeRow1 key={i} heading='Lorem Ipsum' text={text} imgSrc='/static/frontend/img/dummy-img.jpg' />);
        } else {
          items.push(<ZLikeRow2 key={i} heading='Lorem Ipsum' text={text} imgSrc='/static/frontend/img/dummy-img.jpg' />);
        };
      }
    };

    this.setState({ 'items': items })
  }

  componentWillMount() {
    this.updateItems()
    window.addEventListener('resize', this.updateItems);
  };

  render() {
    return (
      <NavbarFooter>
        <section id="service">
          <div className="container">
            <h1>Rug Cleaning</h1>
            <div className="row">
              {this.state['items']}
            </div>
          </div>
        </section>
      </NavbarFooter>
    )
  }

}