import React, { Component } from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import { ShopFilterSidebar } from '../../components/Cards';
import { shopFilterInputOrder } from '../../other/variables';

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'selectedInputs': {},
      'filterToggled': false
    }

    this.onClickFilterToggle = this.onClickFilterToggle.bind(this)
  }

  componentWillMount() {
    let selectedInputs = {};
    Object.values(shopFilterInputOrder).map((input, i) => {
      if (input.inputType == 'radio') {
        selectedInputs[i] = [0]
      } else if (input.inputType == 'checkbox') {
        selectedInputs[i] = []
      }
    })
    this.setState({ 'selectedInputs': selectedInputs })
  }

  handleChangeInput(groupNo, itemNo, type) {
    let { selectedInputs } = this.state;
    if (type == 'radio') {
      selectedInputs[groupNo] = [itemNo]
    } else if (type == 'checkbox') {
      if (selectedInputs[groupNo].includes(itemNo)) {
        selectedInputs[groupNo].splice(selectedInputs[groupNo].indexOf(itemNo), 1)
      } else {
        selectedInputs[groupNo].push(itemNo)
      }
    }
    this.setState({ 'selectedInputs': selectedInputs })
  }

  onClickFilterToggle() {
    $("body").toggleClass("sidenav-toggled");
  }

  render() {

    return (
      <NavbarFooter>
        <section>
          <div className="container">
            <div className="row">
              <ShopFilterSidebar inputs={shopFilterInputOrder}
                onChangeInput={(groupNo, itemNo, type) => this.handleChangeInput(groupNo, itemNo, type)}
                selectedInputs={this.state.selectedInputs} />
            </div>
          </div>
        </section>
      </NavbarFooter >
    );
  }
}
