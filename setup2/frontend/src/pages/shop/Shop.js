import React, { Component } from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import { ShopFilterSidebar } from '../../components/Cards';
import { shopFilterInputOrder, apiUrls } from '../../other/variables';
import axios from 'axios';

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'selectedInputs': {},
      'filterToggled': false,
      'data': null,
    }

    this.onClickFilterToggle = this.onClickFilterToggle.bind(this)
    this.getData = this.getData.bind(this)
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
    this.getData(selectedInputs)
  }

  onClickFilterToggle() {
    $("body").toggleClass("sidenav-toggled");
  }

  getData(selectedInputs) {
    let groupNo;
    shopFilterInputOrder.map((val, i) => {
      if (val.name == 'sortBy') {
        groupNo = i;
      }
    })
    axios({
      method: 'get',
      url: apiUrls['listRugs'],
      data: {
        sort_by: groupNo,
        quanity: 20
      }
    })
      .then(response => console.log(response))
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    let data = this.state.data ? <h1>Received</h1> : <h1>Loading</h1>

    return (
      <NavbarFooter>
        <section>
          <div className="container">
            <div className="row">
              <ShopFilterSidebar inputs={shopFilterInputOrder}
                onChange={(groupNo, itemNo, type) => this.handleChangeInput(groupNo, itemNo, type)}
                selectedInputs={this.state.selectedInputs} />
              {data}
            </div>
          </div>
        </section>
      </NavbarFooter >
    );
  }
}
