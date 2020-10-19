import React, { Component } from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import { ShopFilterSidebar, ShopCard } from '../../components/Cards';
import { shopFilterInputOrder, apiURLs } from '../../other/variables';
import Loading from '../../components/Loading';
import axios from 'axios';

export default class Shop extends Component {
  constructor() {
    super();
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
    Object.values(shopFilterInputOrder).forEach((input, i) => {
      if (input.inputType === 'radio') {
        selectedInputs[i] = [0]
      } else if (input.inputType === 'checkbox') {
        selectedInputs[i] = []
      } else if (input.inputType === 'range') {
        selectedInputs[i] = []
        input.items.forEach(item => {
          selectedInputs[i].push(item.minMax ? item.minMax : [null, null])
        })
      }
    })
    this.setState({ 'selectedInputs': selectedInputs })
  }

  handleChangeInput(groupNo, itemNo, type) {
    let { selectedInputs } = this.state;
    if (type === 'radio') {
      selectedInputs[groupNo] = [itemNo]
    } else if (type === 'checkbox') {
      if (selectedInputs[groupNo].includes(itemNo)) {
        selectedInputs[groupNo].splice(selectedInputs[groupNo].indexOf(itemNo), 1)
      } else {
        selectedInputs[groupNo].push(itemNo)
      }
    } else if (type === 'range') {
      let [nextValue, itemNo_, startEnd] = itemNo;
      let [start, end] = selectedInputs[groupNo][itemNo_];

      if (startEnd === 'start' && parseInt(nextValue) <= end) {
        start = nextValue
      } else if (startEnd === 'end' && parseInt(nextValue) >= start) {
        end = nextValue
      } else if (startEnd === 'both') {
        [start, end] = nextValue
      }
      selectedInputs[groupNo][itemNo_] = [parseInt(start), parseInt(end)]
    }
    this.setState({ selectedInputs: selectedInputs });
    this.getData()
  }

  onClickFilterToggle() {
    document.getElementsByTagName('body')[0].classList.toggle('sidenav-toggled')
  }

  getData() {
    let { selectedInputs } = this.state;
    let sortBy, width, height, styles;
    shopFilterInputOrder.forEach((val, i) => {
      switch (val.name) {
        case 'sortBy':
          sortBy = selectedInputs[i][0]
          break;
        case 'size':
          width = selectedInputs[i][1]
          height = selectedInputs[i][3]
          break;
        case 'style':
          styles = selectedInputs[i]
          break;
        default:
          break;
      }
    })

    axios({
      method: 'get',
      url: apiURLs['listRugs'] + `?sort_by=${sortBy}`
        + `&quanity=${20}&width=${width}&height=${height}&styles=${styles ? styles.join(',') : ''}`,
    })
      .then(response => this.setState({ 'data': response.data }))
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <NavbarFooter>
        {this.state.data
          ? <section>
            <div className="container-fluid">
              <div className="row">
                <div className="col-auto p-0">
                  <ShopFilterSidebar inputs={shopFilterInputOrder}
                    onChange={(groupNo, itemNo, type) => this.handleChangeInput(groupNo, itemNo, type)}
                    selectedInputs={this.state.selectedInputs} />
                </div>
                <div className="mh-100 col">
                  <div className="container">
                    <div className="row justify-content-center">
                      {this.state.data.length === 0 &&
                        <h3>No Rugs Found</h3>
                      }
                      {this.state.data.map((data, i) => {
                        return <ShopCard key={i} id={data.id} heading={data.name} imgSrc={data.rug_images[0]} imgAlt={'Rug Image'}
                          price={[data.base_price_before_sale, data.base_price_after_sale]} />
                      })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          : <Loading />
        }
      </NavbarFooter >
    );
  }
}
