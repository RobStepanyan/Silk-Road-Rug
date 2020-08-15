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
      } else if (input.inputType == 'range') {
        selectedInputs[i] = []
        input.items.map(item => {
          selectedInputs[i].push(item.minMax ? item.minMax : [null, null])
        })
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
    } else if (type == 'range') {
      let [nextValue, itemNo_, startEnd] = itemNo;
      let [start, end] = selectedInputs[groupNo][itemNo_];

      if (startEnd == 'start' && parseInt(nextValue) <= end) {
        start = nextValue
      } else if (startEnd == 'end' && parseInt(nextValue) >= start) {
        end = nextValue
      } else if (startEnd == 'both') {
        [start, end] = nextValue
      }
      selectedInputs[groupNo][itemNo_] = [parseInt(start), parseInt(end)]
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
                onChange={(groupNo, itemNo, type) => this.handleChangeInput(groupNo, itemNo, type)}
                selectedInputs={this.state.selectedInputs} />
            </div>
          </div>
        </section>
      </NavbarFooter >
    );
  }
}
