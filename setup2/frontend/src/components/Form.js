import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toTitleCase, validateEmail, formatPrice } from '../other/functions';


export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isValid': {},
      'value': {},
    }
    props.fields.forEach(field => {
      this.state.isValid[field.context] = field.required ? false : true;
      if (field.context == 'file') {
        this.state.fileHelpText = `Max size: ${field.maxSizeMB}MB`
        this.state.fileMaxSizeMB = field.maxSizeMB
      }
    });

    this.generateInput = this.generateInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }


  generateInput(field) {
    let component, { context, required } = field;

    switch (context) {
      case 'name':
      case 'email':
        component = (
          <>
            <h3 className={required ? 'required' : ''}>{toTitleCase(context)}</h3>
            <input className={this.state.isValid[context] ? '' : 'invalid'}
              onChange={() => this.handleInputChange(event, context, required)}
              type="text" placeholder={'Your ' + toTitleCase(context)} />
          </>
        );
        break;
      case 'textarea':
        component = (
          <>
            <h3 className={required ? 'required' : ''}>Message</h3>
            <textarea className={this.state.isValid[context] ? '' : 'invalid'}
              onChange={() => this.handleInputChange(event, context, required)}
              placeholder="Enter your message here"></textarea>
          </>
        );
        break;
      case 'file':
        component = (
          <>
            <h3 className={'text-center' + (required ? ' required' : '')}>Give us an idea</h3>
            <label className="btn btn-secondary btn-file-upload" htmlFor="uploadFile">Upload a file</label>
            <input onChange={() => this.handleInputChange(event, context, required)}
              type="file" id="uploadFile" name="uploadFile" />
            <small className={"mt-0 text-center" + (this.state.fileHelpText.includes('exceeded') ? ' text-red' : '')}>{this.state.fileHelpText}</small>
          </>
        );
        break;
    }

    return component;
  }


  handleInputChange(e, context, required) {
    let val = e.target.value, valid, file = context == 'file' ? e.target.files[0] : '';

    if ((context == 'email' && validateEmail(val))
      || (['name', 'textarea'].includes(context) && required && val.length > 0)
      || (['name', 'textarea'].includes(context) && !required)
      || (context == 'file' && ((!required && e.target.length == 0) || file.size / 1024 / 1024 < this.state.fileMaxSizeMB))) {

      if (context == 'file') {
        this.setState({ 'fileHelpText': `${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)` })
      }
      valid = true

    } else {
      if (context == 'file') {
        this.setState({ 'fileHelpText': `Max file size exceeded (${(file.size / 1024 / 1024).toFixed(1)}/${this.state.fileMaxSizeMB} MB)` })
      }
      valid = false
    }


    let value = this.state.value, isValid = this.state.isValid;
    value[context] = val;
    isValid[context] = valid;

    this.setState({ 'value': value, 'isValid': isValid })
  }


  handleSubmitClick() {
    if (Object.values(this.state.isValid).every(Boolean)) {
      console.log('Send an api')
    }
  }


  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card">
            <div className="row justify-content-center">
              {
                this.props.fields.map((field, i) => {
                  return (
                    <div key={i} className={'col-12' + (field.half ? ' col-md-6' : '')}>
                      {this.generateInput(field)}
                    </div>
                  )
                })
              }
              <div onClick={this.handleSubmitClick} className="btn btn-primary mb-4">Send a Message</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Form.propTypes = {
  fields: PropTypes.array.isRequired,
};

export function RadioGroupWithPrice(props) {

  return (
    <ul className="style-default p-0">
      {
        props.items.map((item, id) => {
          return (
            <div className="form-check" key={id}>
              <input type="radio" name={props.name} id={props.name + id} checked={props.selectedKeyShipping == id} onChange={() => props.onChange(id)} />
              <label className="form-check-label" htmlFor={props.name + id}>
                {item.label} <span className="price">{item.price == 0 ? '(Free)' : `(+${formatPrice(item.price)})`}</span>
              </label>
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
}