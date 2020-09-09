import React from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import Form from '../../components/Form';
import Loading from '../../components/Loading';
import { apiURLs, apiHeaders } from '../../other/variables';
import axios from 'axios';

export default class ForgotPwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isTokenValid: false, loading: false }
  }


  handleSubmits(url) {
    return (values) => {

      return axios({
        url: url,
        headers: apiHeaders.csrf,
        method: 'post',
        data: values,
      })
    }
  }

  componentDidMount() {
    if (this.props.stage == 'inputNewPwd') {
      this.setState({ loading: true })
      axios.get(apiURLs.forgotPwd.verifyToken(this.props.match.params.uidb64, this.props.match.params.token))
        .then(response => {
          let { data } = response
          this.setState({ isTokenValid: data.is_valid ? true : false, loading: false })
        })
    }
  }

  render() {
    return (
      <NavbarFooter>
        {this.state.loading && this.props.stage == 'inputNewPwd' ? <Loading /> : ''}
        <section id="forgot">
          <div className="container mh-50">
            {this.props.stage == 'inputEmail' &&
              <>
                <h1 className="center">{this.props.title}</h1>
                <Form handleSubmit={this.handleSubmits(apiURLs.forgotPwd.inputEmail)}
                  cols="col-12 col-sm-10 col-lg-6" submitText="Confirm"
                  removeBtnAfterSubmit={true}
                  fields={[{ context: 'email', autoComplete: 'email', required: true, half: false, validate: true }]} />
              </>
            }
            {this.props.stage == 'inputNewPwd' && this.state.isTokenValid &&
              <>
                <h1 className="center">New Password</h1>
                <Form handleSubmit={this.handleSubmits(apiURLs.forgotPwd.inputNewPwd)}
                  uidb64={this.props.match.params.uidb64} token={this.props.match.params.token}
                  authForm={true} setJWT={true} cols="col-12 col-sm-10 col-lg-6"
                  removeBtnAfterSubmit={true} submitText={"Confirm"}
                  fields={[
                    { context: 'password', autoComplete: 'new-password', title: 'password', required: true, half: false },
                    { context: 'password', autoComplete: 'new-password', title: 'confirm password', required: true, half: false },
                  ]}
                />
              </>
            }
            {this.props.stage == 'inputNewPwd' && !this.state.isTokenValid &&
              <div className="full-page-noscroll">
                <div className="centered-div">
                  <h1>OOPS! Something Went Wrong</h1>
                  <div className="sub-heading">Provided token is not valid</div>
                  <a href="/" className="btn btn-primary">Back to Home</a>
                </div>
              </div>
            }
          </div>
        </section>
      </NavbarFooter>
    )
  }
}