import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toTitleCase, validateEmail, validatePwd, formatPrice, setJWTCookie, validateOnlyText, formValueKey, validatePhone } from '../other/functions';
import Loading from '../components/Loading';
import { RangeSlider, InputGroup, InputNumber } from 'rsuite';
import { Redirect } from 'react-router-dom';

export default class Form extends Component {
  constructor(props) {
    super();
    this.state = {
      isValid: {},
      isTouched: {},
      values: {},
      helpText: {},
      alert: null,
      redirectNow: false,
      loading: true,
      typePwdState: {}
    }

    this.generateInput = this.generateInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', (event) => {
      if (event.code == 'Enter') { this.handleSubmitClick() }
    });

    let { state } = this
    this.props.fields.forEach((field, i) => {
      state.isValid[i] = field.required ? false : true;
      state.isTouched[i] = false
      state.helpText[i] = ''
      if (field.context == 'file') {
        state.helpText[i] = `Max size: ${field.maxSizeMB}MB`
        state.fileMaxSizeMB = field.maxSizeMB
      }
      if (field.context == 'password') { state.typePwdState[i] = 'password' }
      let title = field.title ? field.title : field.context
      if (field.initValue) { state.values[formValueKey(title)] = field.initValue; state.isValid[i] = true }
    });
    this.setState({ ...state, loading: false })
  }

  handleClickTypePwd(i) {
    let { typePwdState } = this.state
    typePwdState[i] = typePwdState[i] == 'password' ? 'text' : 'password'
    this.setState({ typePwdState: typePwdState })
  }

  generateInput(field, i) {
    let component, { context, required, autoComplete, validate, onlyText, options, maxLength } = field,
      title = toTitleCase(field.title ? field.title : field.context);

    switch (context) {
      case 'text':
      case 'email':
      case 'password':
      case 'tel':
        component = (
          <>
            <label>
              <h3 className={required ? 'required' : ''}>{title}</h3>
              <div className="eye-icon-wrapper">
                <input className={'m-0' + (this.state.isTouched[i] && validate != false ? this.state.isValid[i] ? ' valid' : ' invalid' : '')}
                  onChange={() => this.handleInputChange(event, context, i, required, validate, title, onlyText, maxLength)}
                  type={context == 'password' ? this.state.typePwdState[i] : context} placeholder={title} autoComplete={autoComplete}
                  value={this.state.values[formValueKey(title)] ? this.state.values[formValueKey(title)] : ''} />
                {context == 'password' &&
                  <div className="eye-icon" onClick={() => this.handleClickTypePwd(i)}>
                    {(context == 'password' && this.state.typePwdState[i] == 'text') &&
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye-slash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path></svg>
                    }
                    {(context == 'password' && this.state.typePwdState[i] == 'password') &&
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>
                    }
                  </div>
                }
              </div>
            </label>
            <>{
              context == 'password' && this.props.loginForm &&
              <small className="text-right mb-n2"><a href="/forgot-password" className="with-underline">Forgot Password?</a></small>
            }
              {
                typeof this.state.helpText[i] == 'object'
                  ? <>
                    <small className="text-red mb-0">{this.state.helpText[i][0]}</small>
                    <ul className="small">
                      {this.state.helpText[i].map((text, i) => {
                        if (i == 0) { return }
                        return <li key={i}> <small className="text-red">{text}</small></li>
                      })
                      }
                    </ul>
                  </>
                  : <small className="text-red">{this.state.helpText[i]}</small>
              }
            </>
          </>
        );
        break;
      case 'textarea':
        component = (
          <label>
            <h3 className={required ? 'required' : ''}>{field.title ? title : 'Message'}</h3>
            <textarea className={this.state.isTouched[i] && validate != false ? this.state.isValid[i] ? ' valid' : ' invalid' : ''}
              onChange={() => this.handleInputChange(event, context, i, required, validate, title, onlyText, maxLength)}
              placeholder="Enter your message here"
              value={this.state.values[formValueKey(title)] ? this.state.values[formValueKey(title)] : ''}></textarea>
          </label>
        );
        break;
      case 'file':
        component = (
          <label>
            <h3 className={'text-center' + (required ? ' required' : '')}>{field.title ? title : 'Give Us an Idea'}</h3>
            <label className="btn btn-secondary btn-file-upload" htmlFor="uploadFile">Upload a file</label>
            <input onChange={() => this.handleInputChange(event, context, i, required, validate, title, onlyText, maxLength)}
              type="file" id="uploadFile" name="uploadFile" />
            <small className={"mt-0 text-center" + (this.state.helpText[i].includes('exceeded') ? ' text-red' : '')}>{this.state.helpText[i]}</small>
          </label>
        );
        break;
      case 'select':
        component = (
          <label>
            <h3 className={required ? 'required' : ''}>{title}</h3>
            <select name={title.replace(' ', '-')} value={this.state.values[formValueKey(title)]}
              onChange={() => this.handleInputChange(event, context, i, required, validate, title, onlyText, maxLength)}>>
              {Object.entries(options).map((option, i) => {
                let [value, name] = option
                return <option key={i} value={value}>{name}</option>
              })

              }
            </select>
          </label>
        )
    }

    return component;
  }


  handleInputChange(e, context, i, required, validate, title, onlyText, maxLength) {
    let pwds, confirmPwd, val = e.target.value, valid, file = context == 'file' ? e.target.files[0] : '';
    let { values, isValid, isTouched, helpText } = this.state;
    if (context == 'password') {
      pwds = []
      let indices = []
      this.props.fields.forEach((field, ii) => {
        if (field.context == 'password') {
          indices = indices.concat(ii)
          let title = formValueKey(field.title)
          pwds = pwds.concat(ii == i ? val : this.state.values[title])
        }
      })

      confirmPwd = Boolean(indices.indexOf(i))
      if (pwds[1] && !confirmPwd && this.state.isTouched[indices[1]]) {
        let f = validatePwd(pwds, true)
        helpText[indices[1]] = f.errorMsgs
        isValid[indices[1]] = f.isValid;
        this.setState({ helpText: helpText, isValid: isValid })
      }
    }

    if ((validate == false) && val.length > 1 && val.length < 255
      || (context == 'email' && validateEmail(val))
      || (['text', 'textarea'].includes(context) && required && val.length > 0 && val.length < (maxLength ? maxLength : 255) && (onlyText ? validateOnlyText(val) ? true : false : true))
      || (['text', 'textarea'].includes(context) && !required && val.length < (maxLength ? maxLength : 255))
      || (context == 'file' && ((!required && e.target.length == 0) || file.size / 1024 / 1024 < this.state.fileMaxSizeMB))
      || (context == 'password' && validatePwd(pwds, confirmPwd).isValid)
      || (context == 'select')
      || (context == 'tel' && validatePhone(val).then(res => {
        let { isValid } = this.state
        isValid[i] = res.data.is_valid
        this.setState({ isValid: isValid })
      }))) {

      valid = true
      if (context == 'file') {
        helpText[i] = `${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`
      } else {
        helpText[i] = ''
      }

    } else {
      valid = false
      if (validate) {
        switch (context) {
          case 'file':
            helpText[i] = `Max file size exceeded (${(file.size / 1024 / 1024).toFixed(1)}/${this.state.fileMaxSizeMB} MB)`
            break;
          case 'email':
            helpText[i] = 'Invalid Email'
            break;
          case 'text':
          case 'textarea':
            helpText[i] = toTitleCase(title) + ' shouldn\'t empty'
            break;
          case 'password':
            helpText[i] = validatePwd(pwds, confirmPwd).errorMsgs
            break;
        }
      }
    }

    values[formValueKey(title)] = val;
    isValid[i] = valid;
    isTouched[i] = true
    this.setState({ values: values, isTouched: isTouched, helpText: helpText })
    if (context != 'tel') {
      this.setState({ isValid: isValid })
    }
  }


  handleSubmitClick() {
    if (Object.values(this.state.isValid).every(Boolean)) {
      this.setState({ loading: true })
      let values = {}
      if (this.props.submitFields) {
        Object.entries(this.state.values).forEach(entry => {
          let [key, val] = entry
          if (this.props.submitFields.includes(key)) {
            values[key] = val
          }
        })
      } else {
        values = this.state.values
      }
      if (this.props.uidb64) { values.uidb64 = this.props.uidb64 }
      if (this.props.token) { values.token = this.props.token }
      if (this.props.addSubmitValues) { values = { ...this.props.addSubmitValues, ...values } }

      if (this.props.handleSubmit) {
        this.props.handleSubmit(values)
          .then(response => {
            let { data } = response
            if (this.props.setJWT && data.token) { setJWTCookie(data.token) }
            if (Object.keys(data).includes('error')) {
              this.setState({ alert: { isError: true, msg: data['error'] }, loading: false })
            } else {
              this.setState({ redirectNow: true, alert: { msg: data['msg'] } })
            }
          })
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              this.setState({ alert: { isError: true, msg: 'An error has occurred. Please try again later.' } })
            }
            this.setState({ loading: false })
          })
      }
    }
  }


  render() {
    if (this.state.redirectNow && this.props.redirect) {
      if (this.props.redirectTo && this.props.redirectTo == '.') {
        window.location.reload()
      } else {
        return <Redirect to={this.props.redirectTo ? this.props.redirectTo : '/'} />
      }
    }

    return (
      <div className={"row" + (this.props.notJustified ? '' : " justify-content-center")}>
        {this.state.loading ? <Loading /> : ''}
        <div className={this.props.cols ? this.props.cols : "col-12"}>
          {this.state.alert &&
            <div className={"alert" + (this.state.alert.isError ? " danger" : " success")}>{this.state.alert.msg}</div>
          }

          <div className={this.props.withoutCard ? '' : "card"}>
            <form className={"row" + (this.props.notJustified ? '' : " justify-content-center")}>
              {
                this.props.fields.map((field, i) => {
                  return (
                    <div key={i} className={'col-12' + (field.half ? ' col-md-6' : '')}>
                      {this.generateInput(field, i)}
                    </div>
                  )
                })
              }
              <div className="col-12">
                {this.props.removeBtnAfterSubmit && this.state.redirectNow
                  ? <></>
                  : <div onClick={this.handleSubmitClick} className="btn btn-primary mb-4 ml-0">
                    {this.props.submitText ? this.props.submitText : 'Send a Message'}
                  </div>
                }
              </div>
            </form>
          </div>
        </div>
      </div >
    );
  }
}


Form.propTypes = {
  fields: PropTypes.array.isRequired,
  // Field props:
  // context: e.g. password, email (type=) or select,
  // options: used with context: 'select' 
  // autoComplete: check chrome docs,
  // title: Title displayed above input (if empty context used) also used for sending values,
  // required: Boolean,
  // half: Boolean (half of the .row),
  // validate: Boolean,
  // initValue: String
  // onlyText: Boolean
  // maxLength: integer
  loginForm: PropTypes.bool, // is it a Login Form? (forgot pass btn)
  submitFields: PropTypes.array, // what fields to submit (default: all)
  handleSubmit: PropTypes.func.isRequired, // func that handles submit
  authForm: PropTypes.bool, // is Authentication form? (login, signup)
  setJWT: PropTypes.bool, // are JWT's received and needed to be stored
  cols: PropTypes.string, // col classes to be applied to Form
  removeBtnAfterSubmit: PropTypes.bool,
  redirect: PropTypes.bool,
  redirectTo: PropTypes.string, // default: '/'
  submitText: PropTypes.string, // submit btn's text
  uidb64: PropTypes.string, //optional (used in "Forgot" views)
  token: PropTypes.string, // optional (used in "Forgot" views)
  withoutCard: PropTypes.bool, // do not wrap the form in .card
  notJustified: PropTypes.bool, // do not add .justify-content-center to the form's row
  addSubmitValues: PropTypes.object, // additional values to send with Form values
};

export function RadioGroupWithPrice(props) {

  return (
    <ul className="style-default p-0">
      {
        props.items.map((item, id) => {
          return (
            <div className="form-check" key={id}>
              {item.price != null
                ? (
                  <>
                    <input type="radio" name={props.name} id={props.name + id} checked={props.selectedId == id} onChange={() => props.onChange(id)} />
                    <label className="form-check-label" htmlFor={props.name + id}>
                      {item.label + ' '}
                      {item.with_sale
                        ? <>
                          <span className="price">{formatPrice(item.price[1]) + ' '}</span>
                          <span className="price discounted">{formatPrice(item.price[0])}
                            {item.is_sample &&
                              <span className="badge">Sample</span>
                            }
                          </span>
                        </>
                        : <span className="price">{item.price == 0 ? '(Free)' : `${props.priceSign}${formatPrice(item.price)}`}
                          {item.is_sample &&
                            <span className="badge">Sample</span>
                          }
                        </span>
                      }
                    </label>
                  </>
                )
                : (
                  <label className="form-check-label disabled">
                    {item.label}
                  </label>
                )
              }

            </div>
          )
        })
      }
    </ul>
  )
}

RadioGroupWithPrice.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selectedId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  priceSign: PropTypes.string,
}
RadioGroupWithPrice.defaultProps = {
  priceSign: '+'
}

export function CheckboxGroupWithPrice(props) {

  return (
    <ul className="style-default p-0">
      {
        props.items.map((item, id) => {
          return (
            <div className="form-check" key={id}>
              {item.price != null
                ? (
                  <>
                    <input type="checkbox" name={props.name} id={props.name + id} checked={props.selectedIds.includes(id)} onChange={() => props.onChange(id)} />
                    <label className="form-check-label" htmlFor={props.name + id}>
                      {item.label} <span className="price">{item.price == 0 ? '(Free)' : `+${formatPrice(item.price)}`}</span>
                    </label>
                  </>
                )
                : (
                  <label className="form-check-label disabled">
                    {item.label}
                  </label>
                )
              }
            </div>
          )
        })
      }
    </ul>
  )
}

CheckboxGroupWithPrice.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export function RadioGroup(props) {

  return (
    <ul className="style-default p-0">
      {
        props.items.map((item, id) => {
          return (
            <div className="form-check" key={id}>
              <input type="radio" name={props.name} id={props.name + id} checked={props.selectedId == id} onChange={() => props.onChange(id)} />
              <label className="form-check-label" htmlFor={props.name + id}>
                {item}
              </label>
            </div>
          )
        })
      }
    </ul>
  )
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export function CheckboxGroup(props) {

  return (
    <ul className="style-default p-0">
      {
        props.items.map((item, id) => {
          if (typeof item == 'object') {
            return <div key={id} className="dropdown-heading">{item.heading}</div>
          } else {
            return (
              <div key={id} className="form-check" key={id}>
                <input type="checkbox" name={props.name} id={props.name + id} checked={props.selectedIds.includes(id)}
                  onChange={() => props.onChange(id)} />
                <label className="form-check-label" htmlFor={props.name + id}>
                  {item}
                </label>
              </div>
            )
          }

        })
      }
    </ul>
  )
}

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export function RangeSliderGroup(props) {
  return (
    props.items.map((item, id) => {
      if ('heading' in item) {
        return <div key={id} className="dropdown-heading">{item.heading}</div>
      }
      return (
        <div key={id}>
          <RangeSlider onChange={values => props.onChange([values, id, 'both'])}
            defaultValue={item.minMax}
            value={props.values[id]}
            min={item.minMax[0]}
            max={item.minMax[1]}
          />
          <InputGroup>
            <InputNumber
              min={item.minMax[0]}
              max={item.minMax[1]}
              value={props.values[id][0]}
              onChange={nextValue => props.onChange([nextValue, id, 'start'])}
            />
            <InputGroup.Addon>to</InputGroup.Addon>
            <InputNumber
              min={item.minMax[0]}
              max={item.minMax[1]}
              value={props.values[id][1]}
              onChange={nextValue => props.onChange([nextValue, id, 'end'])}
            />
          </InputGroup>
        </div>
      )
    })
  )
}
