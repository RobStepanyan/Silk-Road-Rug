import axios from 'axios';
import React from 'react';
import Loading from '../../components/Loading';
import NavbarFooter from '../../components/NavbarFooter';
import { apiURLs } from '../../other/variables';
import { ShopSection } from '../Home';

export default class ShopRoot extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      loading: true,
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: apiURLs.rugGroup.list,
    })
      .then(res => {
        let data = {}
        data.byAge = res.data.by_age
        data.byType = res.data.by_type
        this.setState({ data, loading: false })
      })
  }

  render() {
    if (this.state.loading) { return <Loading /> }
    return (
      <NavbarFooter>
        <ShopSection data={this.state.data} />
      </NavbarFooter>
    )
  }

}