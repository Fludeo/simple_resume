/* eslint-disable jsx-a11y/label-has-associated-control */
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import React, { useState } from 'react';
import '../../styles/section_item.css';

type Iitem ={

    item:string,
    text:string,
    location:string,
    dateRange:{
    from:string,
    to:string}
  }

  type props = {
      item:Iitem
      UpdateField:(payload:any)=>void
  }

function SectionItem({ item, UpdateField }:props) {
  const [minimized, setMinimized] = useState(false);

  return (minimized ? (
    <div className="minimized-item__item-container">
      <input
        id="item"
        onChange={(e) => {
          UpdateField({ field: 'item', value: e.currentTarget.value });
        }}
        className="minimized-item__item"
        type="text"
        defaultValue={item.item}
      />
      <FiChevronDown
        onClick={() => setMinimized(false)}
        className="section-builder-item__close-icon
                           section-builder-item__close-icon--hover"
      />

    </div>
  )
    : (
      <div className="section-builder-item">

        <div className="section-builder-item__item-container">
          <label htmlFor="item" className="section-builder-item__item-label">  </label>
          Course, skill, job, etc ...
          <input
            id="item"
            onChange={(e) => {
              UpdateField({ field: 'item', value: e.currentTarget.value });
            }}
            className="section-builder-item__item"
            type="text"
            defaultValue={item.item}
          />

        </div>
        <div className="section-builder-item__location-container">
          <label htmlFor="location" className="section-builder-item__location-label"> </label>
          Location
          <input
            id="location"
            onChange={(e) => {
              UpdateField({ field: 'location', value: e.currentTarget.value });
            }}
            className="section-builder-item__location"
            type="text"
            defaultValue={item.location}
          />

        </div>
        <div className="section-builder-item__description-container">
          <label htmlFor="description" className="section-builder-item__description-label" />
          Brief description
          <textarea
            id="description"
            onChange={(e) => {
              UpdateField({ field: 'text', value: e.currentTarget.value });
            }}
            className="section-builder-item__description"
            defaultValue={item.text}
          />

        </div>

        <div className="section-builder-item__date-container">
          <label htmlFor="date" className="section-builder-item__date-label">  </label>
          From date to date
          <div id="date" className="section-builder-item__date-input-wrapper">
            <input
              onChange={(e) => {
                UpdateField({ field: 'dateRange', value: { ...item.dateRange, from: e.currentTarget.value } });
              }}
              className="section-builder-item__date-from"
              type="text"
              defaultValue={item.dateRange.from}
            />
            <input
              onChange={(e) => {
                UpdateField({ field: 'to', value: { ...item.dateRange, to: e.currentTarget.value } });
              }}
              className="section-builder-item__date-to"
              type="text"
              defaultValue={item.dateRange.to}
            />
          </div>

        </div>
        <div className="section-builder-item__close-icon-container">
          <FiChevronUp
            onClick={() => setMinimized(true)}
            className="section-builder-item__close-icon
                           section-builder-item__close-icon--hover"
          />
        </div>
      </div>
    )
  );
}

export default SectionItem;
