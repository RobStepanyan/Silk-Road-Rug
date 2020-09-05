import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toTitleCase, validateEmail, validatePwd, formatPrice, setJWTCookie, validateOnlyText } from '../other/functions';
import Loading from '../components/Loading';
import { RangeSlider, InputGroup, InputNumber } from 'rsuite';
import { Redirect } from 'react-router-dom';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: {},
      isTouched: {},
      values: {},
      helpText: {},
      alert: null,
      redirectNow: false,
      loading: false
    }
    props.fields.forEach((field, i) => {
      this.state.isValid[i] = field.required ? false : true;
      this.state.isTouched[i] = false
      this.state.helpText[i] = ''
      if (field.context == 'file') {
        this.state.helpText[i] = `Max size: ${field.maxSizeMB}MB`
        this.state.fileMaxSizeMB = field.maxSizeMB
      }
    });

    this.generateInput = this.generateInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }


  generateInput(field, i) {
    let component, { context, required, autoComplete, validate, onlyText } = field,
      title = toTitleCase(field.title ? field.title : field.context);

    switch (context) {
      case 'text':
      case 'email':
      case 'password':
        component = (
          <>
            <label>
              <h3 className={required ? 'required' : ''}>{title}</h3>
              <input className={'m-0' + (this.state.isTouched[i] && validate != false ? this.state.isValid[i] ? ' valid' : ' invalid' : '')}
                onChange={() => this.handleInputChange(event, context, i, required, validate, title, onlyText)}
                type={context} placeholder={title} autoComplete={autoComplete} />
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
            <h3 className={required ? 'required' : ''}>Message</h3>
            <textarea className={this.state.isTouched[i] && validate != false ? this.state.isValid[i] ? ' valid' : ' invalid' : ''}
              onChange={() => this.handleInputChange(event, context, i, required, validate, title, onlyText)}
              placeholder="Enter your message here"></textarea>
          </label>
        );
        break;
      case 'file':
        component = (
          <label>
            <h3 className={'text-center' + (required ? ' required' : '')}>Give us an idea</h3>
            <label className="btn btn-secondary btn-file-upload" htmlFor="uploadFile">Upload a file</label>
            <input onChange={() => this.handleInputChange(event, context, i, required, validate, title, onlyText)}
              type="file" id="uploadFile" name="uploadFile" />
            <small className={"mt-0 text-center" + (this.state.helpText[i].includes('exceeded') ? ' text-red' : '')}>{this.state.helpText[i]}</small>
          </label>
        );
        break;
    }

    return component;
  }


  handleInputChange(e, context, i, required, validate, title, onlyText) {
    let pwds, confirmPwd, val = e.target.value, valid, file = context == 'file' ? e.target.files[0] : '';
    let { values, isValid, isTouched, helpText } = this.state;
    if (context == 'password') {
      pwds = []
      let indices = []
      this.props.fields.forEach((field, ii) => {
        if (field.context == 'password') {
          indices = indices.concat(ii)
          pwds = pwds.concat(ii == i ? val : this.state.values[field.title])
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
      || (['text', 'textarea'].includes(context) && required && val.length > 0 && val.length < 255 && (onlyText ? validateOnlyText(val) ? true : false : true))
      || (['text', 'textarea'].includes(context) && !required && val.length > 1 && val.length < 255)
      || (context == 'file' && ((!required && e.target.length == 0) || file.size / 1024 / 1024 < this.state.fileMaxSizeMB))
      || (context == 'password' && validatePwd(pwds, confirmPwd).isValid)) {
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

    values[title.toLowerCase().replace(' ', '_')] = val;
    isValid[i] = valid;
    isTouched[i] = true

    this.setState({ values: values, isValid: isValid, isTouched: isTouched, helpText: helpText })
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

      if (this.props.handleSubmit) {
        this.props.handleSubmit(values)
          .then(response => {
            let { data } = response
            if (this.props.setJWT && data.token) { setJWTCookie(data.token) }
            if (Object.keys(data).includes('error')) {
              this.setState({ alert: { isError: true, msg: data['error'] } })
            } else {
              this.setState({ redirectNow: true, alert: { msg: data['msg'] } })
            }
            this.setState({ loading: false })
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
    return (
      <div className="row justify-content-center">
        {this.state.loading ? <Loading /> : ''}
        <div className={this.props.cols ? this.props.cols : "col-12"}>
          {this.state.alert &&
            <div className={"alert" + (this.state.alert.isError ? " danger" : " success")}>{this.state.alert.msg}</div>
          }

          <div className="card">
            <form className="row justify-content-center">
              {
                this.props.fields.map((field, i) => {
                  return (
                    <div key={i} className={'col-12' + (field.half ? ' col-md-6' : '')}>
                      {this.generateInput(field, i)}
                    </div>
                  )
                })
              }
              {(this.state.redirectNow)
                ? <>{this.props.removeBtnAfterSubmit
                  ? <></>
                  : this.props.redirect ? <Redirect to='/' /> : ''
                }</>
                : <div onClick={this.handleSubmitClick} className="btn btn-primary mb-4">
                  {this.props.submitText ? this.props.submitText : 'Send a Message'}
                </div>
              }
            </form>
          </div>
        </div>
      </div >
    );
  }
}


Form.propTypes = {
  fields: PropTypes.array.isRequired,
  loginForm: PropTypes.bool, // is it a Login Form? (forgot pass btn)
  submitFields: PropTypes.array, // what fields to submit
  handleSubmit: PropTypes.func.isRequired, // func that handles submit
  authForm: PropTypes.bool, // is Authentication form? (login, signup)
  setJWT: PropTypes.bool, // are JWT's received and needed to be stored
  cols: PropTypes.string, // col classes to be applied to Form
  removeBtnAfterSubmit: PropTypes.bool,
  redirect: PropTypes.bool,
  submitText: PropTypes.string, // submit btn's text
  uidb64: PropTypes.string, //optional
  token: PropTypes.string, // optional
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
                          <span className="price discounted">{formatPrice(item.price[1])}
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
RadioGroup.defaultProps = {
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
