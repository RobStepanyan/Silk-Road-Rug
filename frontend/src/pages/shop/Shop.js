import React, { Component } from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import { ShopFilterSidebar, ShopCard, CategoryCard } from '../../components/Cards';
import { shopFilterInputOrder, apiURLs } from '../../other/variables';
import { toTitleCase } from '../../other/functions';
import Loading from '../../components/Loading';
import axios from 'axios';
import Error from '../../pages/Error';

export default class Shop extends Component {
  constructor() {
    super();
    this.state = {
      selectedInputs: {},
      filterToggled: false,
      data: {},
      redirectTo404: false,
      loading: true
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
    this.setState({ selectedInputs })
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
    this.setState({ selectedInputs });
    this.getData()
  }

  onClickFilterToggle() {
    document.getElementsByTagName('body')[0].classList.toggle('sidenav-toggled')
  }

  getData() {
    axios.get(apiURLs.rugGroup.get(this.props.match.params.rugGroup))
      .then(res => {
        if (res.data.error) { this.setState({ redirectTo404: true, loading: false }); return null }
        let { data } = this.state
        data.rugGroup = res.data
        this.setState({ data })
      }
      )
    let sortBy, width, height, { selectedInputs } = this.state
    shopFilterInputOrder.forEach((x, i) => {
      if (x.name === 'sortBy') {
        sortBy = selectedInputs[i][0]
      }
      else if (x.name === 'size') {
        width = selectedInputs[i][1]
        height = selectedInputs[i][3]
      }
    })
    axios({
      method: 'get',
      url: apiURLs.rug.list,
      params: {
        rug_group: this.props.match.params.rugGroup,
        sort_by: sortBy,
        width,
        height,
      }
    })
      .then(res => {
        let { data } = this.state
        data.rugs = res.data
        this.setState({ data, loading: false })
      })
  }

  componentDidMount() { this.getData() }

  render() {
    if (this.state.loading || !this.state.data.rugGroup) { return <Loading /> }
    if (this.state.redirectTo404) { return <Error error="404" /> }
    return <NavbarFooter>
      <section className="py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-auto p-0">
              <ShopFilterSidebar inputs={shopFilterInputOrder}
                onChange={(groupNo, itemNo, type) => this.handleChangeInput(groupNo, itemNo, type)}
                selectedInputs={this.state.selectedInputs} />
            </div>
            <div className="mh-100 col">
              <div className="container">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mt-0">
                    {this.state.data.rugGroup.tree.map((x, i) => {
                      let isActive = x.id.toString() === this.props.match.params.rugGroup
                      return <li key={i} className={"breadcrumb-item" + (isActive ? ' active' : '')}>
                        {isActive
                          ? toTitleCase(x.title)
                          : <a href={"/shop/" + x.id}>{toTitleCase(x.title)}</a>
                        }
                      </li>
                    })
                    }
                  </ol>
                </nav>
                {Boolean(this.state.data.rugGroup.children.length) &&
                  <>
                    <div className="row justify-content-center">
                      {this.state.data.rugGroup.children.map((x, i) => {
                        return <div className="col-12 col-sm-6 col-lg-4" key={i} >
                          <CategoryCard href={"/shop/" + x.id} imageSrc={x.image} heading={x.title} />
                        </div>
                      })}
                    </div>
                    <hr className="my-3" />
                  </>
                }
                <h2 className="mb-3">
                  {(this.state.data.rugGroup.tree.length > 1 ? this.state.data.rugGroup.tree[0].title : '') +
                    ` ${this.state.data.rugGroup.title}  Rugs`}
                </h2>
                {!this.state.data.rugs.length && <p>No rugs found.</p>}
                <div className="row">
                  {this.state.data.rugs.map((x, i) => {
                    return <ShopCard key={i}
                      price={[x.base_price_before_sale, x.base_price_after_sale]}
                      id={x.id} imgSrc={x.images[0].image} heading={x.name}
                    />
                  })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </NavbarFooter >
  }
}
