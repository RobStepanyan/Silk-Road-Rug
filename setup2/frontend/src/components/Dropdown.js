import React from 'react';
import $ from 'jquery';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    this.handleDropItemClick = this.handleDropItemClick.bind(this);
    this.state = {
      'btnText': "All " + this.props.title.slice(0, 1).toUpperCase() + this.props.title.slice(1) + "s",
      'activeItemIndex': "0"
    }
  }

  handleDropItemClick(x) {
    this.setState({ 'activeItemIndex': x })
  }

  render() {
    return (
      <div className="dropdown" >
        <a className="btn card-btn" id={"shop-" + this.props.title + "s"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.state.btnText}
        </a>
        <div className="dropdown-menu" data-toggle-enabled="true" aria-labelledby={"shop-" + this.props.title + "s"}>
          {[
            <DropdownItem
              key="0"
              content={`All ${this.props.title}s`}
              active={this.state['activeItemIndex'] == '0' ? true : false}
              onClick={() => { this.handleDropItemClick("0") }} />
          ].concat(
            this.props.values.items.map((item, index) => {
              return <DropdownItem
                key={(index + 1).toString()}
                content={item}
                active={this.state['activeItemIndex'] == (index + 1).toString() ? true : false}
                onClick={() => { this.handleDropItemClick((index + 1).toString()) }} />
            }))}
        </div>
      </div>
    )
  }
}

export function DropdownItem(props) {
  return (<a className={props.heading ? 'dropdown-heading' : props.active ? 'dropdown-item active' : 'dropdown-item'} onClick={props.onClick} >
    {props.content}
  </a >
  )
}