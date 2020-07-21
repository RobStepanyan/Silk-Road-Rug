import React from 'react';
import Dropdown from './Dropdown';

export default function ShopFilterCard(props) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="shop-filter-card">
        <h2 className="card-title">{props.title.slice(0, 1).toUpperCase() + props.title.slice(1)}</h2>
        <Dropdown title={props.title} values={props.values} />
      </div>
    </div >
  )
}