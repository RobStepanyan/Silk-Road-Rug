import React from 'react';
import Loading from '../../components/Loading';
import axios from 'axios';
import { apiURLs } from '../../other/variables';
import { setJWTCookie } from '../../other/functions';

export default class SignUpVerify extends React.Component {
  constructor() {
    super();
    this.state = { isTokenValid: false, loading: false }
  }

  componentWillMount() {
    this.setState({ loading: true })
    axios.get(
      apiURLs['signUpVerify'](this.props.match.params.uidb64, this.props.match.params.token),
    ).then(response => {
      let { data } = response
      this.setState({ isTokenValid: data.is_valid ? true : false, loading: false })
      if (data.is_valid) { setJWTCookie(data.token) }
    })
  }

  render() {
    return (
      <>
        {this.state.loading ? <Loading /> : ''}
        <div className="full-page-noscroll">
          <div className="centered-div">
            {this.state.isTokenValid
              ? <>
                <h1>Email is Verified</h1>
                <div className="sub-heading">Your email is verified. Now you can use your account.  </div>
                <a href="/account" className="btn btn-primary">Go to Account</a>
              </>
              : <><h1>OOPS! Something Went Wrong</h1>
                <div className="sub-heading">Provided token is not valid</div>
                <a href="/" className="btn btn-primary">Back to Home</a>
              </>
            }

          </div>
        </div>
      </>
    )
  }

}