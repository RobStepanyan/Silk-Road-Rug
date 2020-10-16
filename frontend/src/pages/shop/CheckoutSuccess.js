import axios from 'axios';
import React from 'react';
import Loading from '../../components/Loading';
import { apiHeaders, apiURLs } from '../../other/variables';
import Error from '../Error';
import FullPageNoScroll from '../FullPageNoScroll';

export default class CheckoutSuccess extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      redirectTo404: false,
      firstName: "",
    }
  }

  componentDidMount() {
    let checkout_id = this.props.match.params.checkout
    axios({
      method: 'post',
      headers: { ...apiHeaders.authorization, ...apiHeaders.csrf },
      url: apiURLs.checkout.check,
      data: { checkout_id }
    })
      .then(res => {
        let { data } = res
        if (data.error) { this.setState({ redirectTo404: true, loading: false }); return }
        this.setState({ firstName: data.first_name, loading: false })
      })
      .catch(res => this.setState({ redirectTo404: true }))
  }

  render() {
    if (this.state.loading) { return <Loading /> }
    if (this.state.redirectTo404) { return <Error error={404} /> }
    return (
      <FullPageNoScroll heading="Order Placed" text={`Thanks for you order, ${this.state.firstName}. You can easily manage your orders in your account. We appreciate your business!`}
        btnText="Go to Orders" btnHref="/account/orders" />
    )
  }
}