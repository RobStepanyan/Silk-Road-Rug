import React from 'react';
import Loading from '../../components/Loading';
import axios from 'axios';
import NavbarFooter from '../../components/NavbarFooter';

export default class AccountUpdateVerify extends React.Component {
  constructor() {
    super();
    this.state = { isTokenValid: false, loading: true }
  }

  componentWillMount() {
    axios.get(
      this.props.apiURL(this.props.match.params.midb64)
    ).then(response => {
      let { data } = response
      this.setState({ isTokenValid: data.is_valid ? true : false, loading: false })
    })
      .catch(this.setState({ loading: false }))
  }

  render() {
    return (
      <NavbarFooter>
        {this.state.loading ? <Loading /> : ''}
        <div className="full-page-noscroll">
          <div className="centered-div">
            {this.state.isTokenValid
              ? <>
                <h1>Email is Verified</h1>
                <div className="sub-heading">{this.props.text}</div>
                <a href="/account" className="btn btn-primary">Go to Account</a>
              </>
              : <><h1>OOPS! Something Went Wrong</h1>
                <div className="sub-heading">Link is not valid</div>
                <a href="/" className="btn btn-primary">Back to Home</a>
              </>
            }

          </div>
        </div>
      </NavbarFooter>
    )
  }

}