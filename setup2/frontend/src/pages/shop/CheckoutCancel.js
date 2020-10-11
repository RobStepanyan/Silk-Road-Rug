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
    }
  }

  componentDidMount() {
    let checkout_id = this.props.match.params.checkout
    axios({
      method: 'post',
      headers: { ...apiHeaders.authorization, ...apiHeaders.csrf },
      url: apiURLs.checkout.cancel,
      data: { checkout_id }
    })
      .then(res => {
        let { data } = res
        if (data.error) { this.setState({ redirectTo404: true, loading: false }); return }
        this.setState({ loading: false })
      })
  }

  render() {
    if (this.state.loading) { return <Loading /> }
    if (this.state.redirectTo404) { return <Error error={404} /> }
    return (
      <FullPageNoScroll heading="Order Canceled"
        text="Something went wrong, or you canceled your order. Please try again later or contact us for a resolution if needed. We appreciate your business!"
        btnText="Back to Home" btnHref="/" />
    )
  }
}