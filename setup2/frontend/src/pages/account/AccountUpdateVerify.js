import React from 'react';
import Loading from '../../components/Loading';
import axios from 'axios';
import { apiURLs } from '../../other/variables';
import { setJWTCookie } from '../../other/functions';

export default class AccountUpdateVerify extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isTokenValid: false, loading: true }
  }

  componentWillMount() {
    axios.get(
      apiURLs.user.updateVerify(this.props.match.params.midb64)
    ).then(response => {
      let { data } = response
      this.setState({ isTokenValid: data.is_valid ? true : false, loading: false })
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
                <div className="sub-heading">Your personal info is changed. Now you can use your account.</div>
                <a href="/account" className="btn btn-primary">Go to Account</a>
              </>
              : <><h1>OOPS! Something Went Wrong</h1>
                <div className="sub-heading">Link is not valid</div>
                <a href="/" className="btn btn-primary">Back to Home</a>
              </>
            }

          </div>
        </div>
      </>
    )
  }

}