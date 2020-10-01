import React from 'react';
import NavbarFooter from '../../components/NavbarFooter';
import { AccountCard } from '../../components/Cards';
import Loading from '../../components/Loading';
import Form from '../../components/Form';
import Error from '../../pages/Error';
import axios from 'axios';
import { apiURLs, apiHeaders, COUNTRIES } from '../../other/variables';
import { formValueKey, isAuthed } from '../../other/functions';
import { Redirect } from 'react-router-dom';

export default class Account extends React.Component {
  constructor(props) {
    super()
    this.state = {
      cards: {
        '/personal-info': { title: 'Personal Info', component: <PersonalInfo /> },
        '/security': { title: 'Security', component: <Security /> },
        '/addresses': { title: 'Addresses', component: <Addresses /> },
        '/addresses/add': { title: 'Add Address', component: <AddAddress />, include: false },
        '/addresses/edit': { title: 'Edit Address', component: <EditAddress {...props} />, include: false },
        '/orders': { title: 'Orders', component: <Orders /> },
        '/preferences': { title: 'Preferences', component: <Preferences /> },
        './logout': { title: 'Log Out', withoutAngle: true, danger: true },
      },
      icons: [
        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" > <path fill="currentColor" d="M256 32c61.8 0 112 50.2 112 112s-50.2 112-112 112-112-50.2-112-112S194.2 32 256 32m128 320c52.9 0 96 43.1 96 96v32H32v-32c0-52.9 43.1-96 96-96 85 0 67.3 16 128 16 60.9 0 42.9-16 128-16M256 0c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144S335.5 0 256 0zm128 320c-92.4 0-71 16-128 16-56.8 0-35.7-16-128-16C57.3 320 0 377.3 0 448v32c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-32c0-70.7-57.3-128-128-128z" ></path></svg >,
        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="lock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-16v-62.5C384 73.1 312.9.3 224.5 0 136-.3 64 71.6 64 160v64H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zM96 160c0-70.6 57.4-128 128-128s128 57.4 128 128v64H96v-64zm304 320H48c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v192c0 8.8-7.2 16-16 16z"></path></svg>,
        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="map-marker-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" ><path fill="currentColor" d="M192 96c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 160c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64zm0-256C85.961 0 0 85.961 0 192c0 77.413 26.97 99.031 172.268 309.67 9.534 13.772 29.929 13.774 39.465 0C357.03 291.031 384 269.413 384 192 384 85.961 298.039 0 192 0zm0 473.931C52.705 272.488 32 256.494 32 192c0-42.738 16.643-82.917 46.863-113.137S149.262 32 192 32s82.917 16.643 113.137 46.863S352 149.262 352 192c0 64.49-20.692 80.47-160 281.931z"></path></svg>,
        <></>,
        <></>,
        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="hand-holding-box" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M112 256h352c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16zM256 32h64v76.2l-32-16-32 16V32zm-128 0h96v128l64-32 64 32V32h96v192H128V32zm430.3 301.6c-9.6-8.6-22.1-13.4-35.2-13.4-12.5 0-24.8 4.3-34.6 12.2l-61.6 49.3c-1.9 1.5-4.2 2.3-6.7 2.3h-41.6c4.6-9.6 6.5-20.7 4.8-32.3-4-27.9-29.6-47.7-57.8-47.7H181.3c-20.8 0-41 6.7-57.6 19.2L85.3 352H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h88l46.9-35.2c11.1-8.3 24.6-12.8 38.4-12.8H328c13.3 0 24 10.7 24 24s-10.7 24-24 24h-88c-8.8 0-16 7.2-16 16s7.2 16 16 16h180.2c9.7 0 19.1-3.3 26.7-9.3l61.6-49.2c4.2-3.4 9.5-5.2 14.6-5.2 5 0 9.9 1.7 13.8 5.2 10.1 9.1 9.3 24.5-.9 32.6l-100.8 80.7c-7.6 6.1-17 9.3-26.7 9.3H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h400.5c17 0 33.4-5.8 46.6-16.4L556 415c12.2-9.8 19.5-24.4 20-40s-6-30.8-17.7-41.4z"></path></svg>,
        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-cog" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M628.3 358.3l-16.5-9.5c.8-8.5.8-17.1 0-25.6l16.6-9.5c9.5-5.5 13.8-16.7 10.5-27-7.2-23.4-19.9-45.4-36.7-63.5-7.4-8.1-19.3-9.9-28.7-4.4l-16.5 9.5c-7-5-14.4-9.3-22.2-12.8v-19c0-11-7.5-20.3-18.2-22.7-23.9-5.4-49.3-5.4-73.2 0-10.7 2.4-18.2 11.8-18.2 22.7v19c-7.8 3.5-15.2 7.8-22.2 12.8l-16.5-9.5c-9.5-5.5-21.3-3.7-28.7 4.4-16.7 18.1-29.4 40.1-36.7 63.4-3.3 10.4 1.2 21.8 10.6 27.2l16.5 9.5c-.8 8.5-.8 17.1 0 25.6l-16.6 9.5c-9.3 5.4-13.8 16.9-10.5 27.1 7.2 23.4 19.9 45.4 36.7 63.5 7.4 8 19.2 9.8 28.7 4.4l16.5-9.5c7 5 14.4 9.3 22.2 12.8v19c0 11 7.5 20.3 18.2 22.7 12 2.7 24.3 4 36.6 4s24.7-1.3 36.6-4c10.7-2.4 18.2-11.8 18.2-22.7v-19c7.8-3.5 15.2-7.8 22.2-12.8l16.5 9.5c9.4 5.4 21.3 3.6 28.7-4.4 16.7-18.1 29.4-40.1 36.7-63.4 3.3-10.4-1.2-21.9-10.6-27.3zm-51.6 7.2l29.4 17c-5.2 14.3-13 27.8-22.8 39.5l-29.4-17c-21.4 18.3-24.5 20.1-51.1 29.5v34c-15.1 2.6-30.6 2.6-45.6 0v-34c-26.9-9.5-30.2-11.7-51.1-29.5l-29.4 17c-9.8-11.8-17.6-25.2-22.8-39.5l29.4-17c-4.9-26.8-5.2-30.6 0-59l-29.4-17c5.2-14.3 13-27.7 22.8-39.5l29.4 17c21.4-18.3 24.5-20.1 51.1-29.5v-34c15.1-2.5 30.7-2.5 45.6 0v34c26.8 9.5 30.2 11.6 51.1 29.5l29.4-17c9.8 11.8 17.6 25.2 22.8 39.5l-29.4 17c4.9 26.8 5.2 30.6 0 59zm-96.7-94c-35.6 0-64.5 29-64.5 64.5s28.9 64.5 64.5 64.5 64.5-29 64.5-64.5-28.9-64.5-64.5-64.5zm0 97c-17.9 0-32.5-14.6-32.5-32.5s14.6-32.5 32.5-32.5 32.5 14.6 32.5 32.5-14.6 32.5-32.5 32.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm0-224c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96zM48 480c-8.8 0-16-7.2-16-16v-41.6C32 365.9 77.9 320 134.4 320c19.6 0 39.1 16 89.6 16 19.2 0 38-3.3 56.5-8.7.5-11.6 1.8-23 4.2-34-8.9 2.7-30.1 10.7-60.7 10.7-47.1 0-60.8-16-89.6-16C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h337c-16-8.6-30.6-19.5-43.5-32H48z"></path></svg>,
        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="sign-out-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M160 217.1c0-8.8 7.2-16 16-16h144v-93.9c0-7.1 8.6-10.7 13.6-5.7l141.6 143.1c6.3 6.3 6.3 16.4 0 22.7L333.6 410.4c-5 5-13.6 1.5-13.6-5.7v-93.9H176c-8.8 0-16-7.2-16-16v-77.7m-32 0v77.7c0 26.5 21.5 48 48 48h112v61.9c0 35.5 43 53.5 68.2 28.3l141.7-143c18.8-18.8 18.8-49.2 0-68L356.2 78.9c-25.1-25.1-68.2-7.3-68.2 28.3v61.9H176c-26.5 0-48 21.6-48 48zM0 112v288c0 26.5 21.5 48 48 48h132c6.6 0 12-5.4 12-12v-8c0-6.6-5.4-12-12-12H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h132c6.6 0 12-5.4 12-12v-8c0-6.6-5.4-12-12-12H48C21.5 64 0 85.5 0 112z"></path></svg>
      ],
      loading: false,
    }
  }

  render() {
    return (
      <NavbarFooter>
        {this.state.loading ? <Loading /> : ''}
        <section id="account">
          <div className="container mh-50">
            {this.props.path &&
              <a href={this.props.parentHref ? this.props.parentHref : "/account"}
                className="btn btn-secondary btn-back ml-0 mb-3">Back</a>
            }
            <h1>{this.props.path ? this.state.cards[this.props.path].title : 'Account'}</h1>
            {!this.props.path
              ? <div className="row">
                {Object.entries(this.state.cards).map((card, i) => {
                  if (card[1].include == false) { return }
                  return <div key={i} className="col-12">
                    <AccountCard href={(card[0][0] == '.' ? '' : '/account') + card[0]} {...card[1]}>
                      {this.state.icons[i]}
                    </AccountCard>
                  </div>
                })}
              </div>
              : this.state.cards[this.props.path].component
            }
          </div>
        </section>
      </NavbarFooter >
    )
  }
}

class PersonalInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      redirectToLogin: false,
      firstName: '',
      lastName: '',
      email: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    if (!isAuthed()) { this.setState({ redirectToLogin: true }) }

    axios({
      method: 'post',
      headers: { ...apiHeaders.csrf, ...apiHeaders.authorization },
      url: apiURLs.user.details,
    })
      .then(response => {
        let { data } = response
        data = data.user
        this.setState({ firstName: data.first_name, lastName: data.last_name, email: data.email, loading: false })
      }
      )
  }

  handleSubmit(values) {
    if (!isAuthed()) { this.setState({ redirectToLogin: true }) }
    return axios({
      method: 'post',
      headers: { ...apiHeaders.csrf, ...apiHeaders.authorization },
      url: apiURLs.user.updatePersonalInfo,
      data: values
    })
  }

  render() {
    return (
      <>
        {this.state.redirectToLogin ? <Redirect to='/login' /> : ''}
        {this.state.loading ? <Loading />
          : <>
            <small className="mt-n3 mb-4">You will be asked to confirm your email after hitting "Save"</small>
            <Form handleSubmit={this.handleSubmit}
              cols="col-12 col-sm-10 col-lg-6"
              removeBtnAfterSubmit
              submitText="Save"
              withoutCard notJustified
              fields={[
                { context: 'text', autoComplete: "first name", title: 'First Name', validate: true, onlyText: true, initValue: this.state.firstName },
                { context: 'text', autoComplete: "last name", title: 'Last Name', validate: true, onlyText: true, initValue: this.state.lastName },
                { context: 'email', autoComplete: "email", validate: true, initValue: this.state.email },
              ]}
            />
          </>
        }
      </>
    )
  }
}


class Security extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      redirectToLogin: false,
      firstName: '',
      lastName: '',
      email: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    if (!isAuthed()) { this.setState({ redirectToLogin: true }) }
    return axios({
      method: 'post',
      headers: { ...apiHeaders.csrf, ...apiHeaders.authorization },
      url: apiURLs.user.changePwd,
      data: values
    })
  }

  render() {
    return (
      <>
        {this.state.redirectToLogin ? <Redirect to='/login' /> : ''}
        {this.state.loading ? <Loading />
          : <>
            <small className="mt-n3 mb-4">You will be asked to confirm your email after hitting "Save"</small>
            <Form handleSubmit={this.handleSubmit}
              cols="col-12 col-sm-10 col-lg-6"
              removeBtnAfterSubmit
              submitText="Save"
              withoutCard notJustified
              fields={[
                { context: 'password', autoComplete: "new-password", title: 'New Password', validate: true, required: true },
                { context: 'password', autoComplete: "new-password", title: 'Confirm Password', validate: true, required: true },
              ]}
            />
          </>
        }
      </>
    )
  }
}

export class Addresses extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      redirectToLogin: false,
      addresses: [],
      toggled: {},
    }
  }

  componentWillMount() {
    if (!isAuthed()) { this.setState({ redirectToLogin: true }) }

    axios({
      method: 'get',
      headers: { ...apiHeaders.csrf, ...apiHeaders.authorization },
      url: apiURLs.user.addresses,
    })
      .then(response => {
        let { data } = response
        this.setState({ addresses: data, loading: false })
      }
      )
      .catch(err => { if (err.response.status == 401) { window.location.reload() } })
  }

  handleClickRemove(id) {
    this.setState({ loading: true })
    axios({
      method: 'post',
      headers: apiHeaders.authorization,
      url: apiURLs.user.removeAddress,
      data: { id: this.state.addresses[id].id }
    }).then(() => {
      let { addresses } = this.state
      addresses.splice(id, 1)
      if (addresses[0]) {
        addresses[0].is_primary = true
      }

      this.setState({ addresses: addresses })
      this.handleClickPrimary(0)
      window.location.reload()
    })
  }

  handleClickPrimary(id) {
    if (this.state.addresses.length == 0) { return }
    this.setState({ loading: true })
    axios({
      method: 'post',
      headers: apiHeaders.authorization,
      url: apiURLs.user.setPrimaryAddress,
      data: { id: this.state.addresses[id].id }
    }).then(() => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  render() {
    if (this.state.redirectToLogin) { return <Redirect to='/login' /> }
    if (this.state.loading) { return <Loading /> }
    if (this.props.state && this.props.state.displayAddAddress) { return <AddAddress redirectTo={this.props.redirectTo} /> }
    if (this.props.state && this.props.state.displayEditAddress) { return <EditAddress redirectTo={this.props.redirectTo} id={this.props.state.editId} /> }

    return (
      <>
        {this.state.addresses.length > 0 &&
          <small className="mt-n3 mb-3 d-inline-flex"><div className="yellow-square"></div>Indicates Primary Address (click to change)</small>
        }
        <div className="row">
          <div className="col-12 col-sm-6 col-lg-4">
            {this.props.integrated
              ? <div onClick={() => this.props.onClick('displayAddAddress', true)} className="d-block account address card new-address">
                <div className="centered-div">
                  <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" ><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>
                  <h3>Add Address</h3>
                </div>
              </div>
              : <a href="/account/addresses/add" className="d-block account address card new-address">
                <div className="centered-div">
                  <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" ><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>
                  <h3>Add Address</h3>
                </div>
              </a>
            }
          </div>
          {this.state.addresses.map((address, i) => {
            return <div key={i} className="col-12 col-sm-6 col-lg-4">
              <div>
                <div onClick={() => { this.setState({ toggled: this.state.toggled[i] ? delete this.state.toggled[i] : { [i]: true } }) }} className="svg-btn">
                  {this.state.toggled[i]
                    ? <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"></path></svg>
                    : <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="ellipsis-v" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path fill="currentColor" d="M64 208c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zM16 104c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48zm0 304c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48z"></path></svg>
                  }
                </div>
                <div className={"svg-group" + (this.state.toggled[i] ? ' toggled' : '')}>
                  <div onClick={() => this.handleClickRemove(i)} className="svg-btn close-btn borderless">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path fill="currentColor" d="M432 80h-82.4l-34-56.7A48 48 0 0 0 274.4 0H173.6a48 48 0 0 0-41.2 23.3L98.4 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16l21.2 339a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM173.6 48h100.8l19.2 32H154.4zm173.3 416H101.11l-21-336h287.8z"></path></svg>
                  </div>
                  {this.props.integrated
                    ? <div onClick={() => {
                      this.props.onClick('displayEditAddress', true)
                      this.props.onClick('editId', this.state.addresses[i].id)
                    }} className="svg-btn">
                      <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg>
                    </div>
                    : <a href={"/account/addresses/edit/" + this.state.addresses[i].id} className="svg-btn">
                      <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg>
                    </a>
                  }
                </div>
                <div onClick={() => this.handleClickPrimary(i)}
                  className={"address card" + (address.is_primary ? ' primary' : '')}>
                  {Object.entries(address).map((field, i) => {
                    let [key, value] = field
                    if (['id', 'is_primary'].includes(key)) { return }
                    return <div key={i}>
                      {key == 'delivery_instructions' && <hr />}
                      <p className={"overflow-hidden" + (key == 'full_name' ? ' font-bold' : key == 'delivery_instructions' ? ' text-gray' : '')}>
                        {key == 'country' ? COUNTRIES[value] : value}
                      </p>
                      {key == 'full_name' && <hr />}
                    </div>
                  })}
                </div>
              </div>
            </div>
          })
          }
        </div>
      </>
    )
  }
}

class AddAddress extends React.Component {
  constructor() {
    super()
    this.state = {
      redirectToLogin: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    if (!isAuthed()) { this.setState({ redirectToLogin: true }) }
    return axios({
      method: 'post',
      headers: { ...apiHeaders.csrf, ...apiHeaders.authorization },
      url: apiURLs.user.addAddress,
      data: values
    })
      .catch(err => { if (err.response.status == 401) { window.location.reload() } })
  }

  render() {
    { this.state.redirectToLogin && <Redirect to='/login' /> }
    return (
      <Form handleSubmit={this.handleSubmit}
        cols="col-12 col-sm-10 col-lg-6"
        submitText="Save"
        withoutCard notJustified redirect redirectTo={this.props.redirectTo ? this.props.redirectTo : '/account/addresses'}
        fields={[
          { context: 'text', autoComplete: "name", title: 'Full Name', required: true, validate: true, onlyText: true },
          { context: 'select', options: COUNTRIES, title: 'Country', required: true, initValue: 'US' },
          { context: 'text', title: 'Address Line 1', required: true, validate: true },
          { context: 'text', title: 'Address Line 2', required: true, validate: true },
          { context: 'text', title: 'City', required: true, validate: true },
          { context: 'text', title: 'State/Province/Region', required: true, validate: true },
          { context: 'text', title: 'Zip Code', maxLength: 10, required: true, validate: true },
          { context: 'tel', title: 'Phone Number (e.g +1...)', required: true, validate: true },
          { context: 'textarea', title: 'Delivery Instructions', required: false, validate: true },
        ]} />
    )
  }
}

class EditAddress extends React.Component {
  constructor(props) {
    super()
    this.state = {
      redirectToLogin: false,
      redirectTo404: false,
      loading: true,
      fields: [],
      id: props.id + 1 ? props.id : props.match.params.id
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    if (!isAuthed()) { this.setState({ redirectToLogin: true }) }
    return axios({
      method: 'post',
      headers: { ...apiHeaders.csrf, ...apiHeaders.authorization },
      url: apiURLs.user.editAddress,
      data: { ...values, id: this.state.id }
    })
      .catch(err => { if (err.response.status == 401) { window.location.reload() } })
  }

  componentDidMount() {
    axios({
      method: 'post',
      headers: { ...apiHeaders.csrf, ...apiHeaders.authorization },
      url: apiURLs.user.getAddress,
      data: { id: this.state.id }
    })
      .then(res => {
        let { data } = res
        if (Object.keys(data).includes('error')) { this.setState({ redirectTo404: true }) }
        else {
          let fields = [
            { context: 'text', autoComplete: "name", title: 'Full Name', required: true, validate: true, onlyText: true },
            { context: 'select', options: COUNTRIES, title: 'Country', required: true },
            { context: 'text', title: 'Address Line 1', required: true, validate: true },
            { context: 'text', title: 'Address Line 2', required: true, validate: true },
            { context: 'text', title: 'City', required: true, validate: true },
            { context: 'text', title: 'State/Province/Region', required: true, validate: true },
            { context: 'text', title: 'Zip Code', maxLength: 10, required: true, validate: true },
            { context: 'tel', title: 'Phone Number (e.g +1...)', required: true, validate: true },
            { context: 'textarea', title: 'Delivery Instructions', required: false, validate: true },
          ]

          fields = fields.map(field => {
            return { ...field, initValue: data.data[formValueKey(field.title)] }
          })
          this.setState({ fields, loading: false })
        }
      })
      .catch(this.setState({ loading: false }))
  }

  render() {
    return (
      <>
        { this.state.redirectToLogin && <Redirect to='/login' />}
        { this.state.redirectTo404
          ? <Error error={404} />
          : this.state.loading
            ? <Loading />
            : <Form handleSubmit={this.handleSubmit}
              cols="col-12 col-sm-10 col-lg-6"
              submitText="Save"
              withoutCard notJustified redirect redirectTo={this.props.redirectTo ? this.props.redirectTo : '/account/addresses'}
              fields={this.state.fields} />
        }
      </>
    )
  }
}

class Preferences extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      redirectToLogin: false,
      firstName: '',
      lastName: '',
      email: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    if (!isAuthed()) { this.setState({ redirectToLogin: true }) }
    // return axios({
    //   method: 'post',
    //   headers: { ...apiHeaders.csrf, ...apiHeaders.authorization },
    //   url: apiURLs.user.changePwd,
    //   data: values
    // })
  }

  render() {
    return (
      <>
        {this.state.redirectToLogin ? <Redirect to='/login' /> : ''}
        {this.state.loading ? <Loading />
          : <p>Content</p>
        }
      </>
    )
  }
}

class Orders extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      redirectToLogin: false,
      firstName: '',
      lastName: '',
      email: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    if (!isAuthed()) { this.setState({ redirectToLogin: true }) }
    // return axios({
    //   method: 'post',
    //   headers: { ...apiHeaders.csrf, ...apiHeaders.authorization },
    //   url: apiURLs.user.changePwd,
    //   data: values
    // })
  }

  render() {
    return (
      <>
        {this.state.redirectToLogin ? <Redirect to='/login' /> : ''}
        {this.state.loading ? <Loading />
          : <p>Content</p>
        }
      </>
    )
  }
}