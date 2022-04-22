/* eslint-disable react/no-array-index-key */
import React from 'react';
import '../../styles/section.css';
import { MdLocationOn } from 'react-icons/md';

type Iitem = {
  uuid:string,
  item:string,
  text:string,
  location:string,
  dateRange:{
  from:string,
  to:string}
}
type ISection = {
  area:string
  title:string,
  items: Array<Iitem>,
}

type props = {
  section:ISection
}
function ResumeSection({ section }:props) {
  return (
    <div className="section">

      {section.title !== '' && <h2 className="section__title">{section.title}</h2>}

      <div className="section__items-container">
        {section.items.map((item:Iitem) => (
          <div className="section-item" key={item.uuid}>

            {item.item !== '' && <h4 className="section-item__item">{item.item}</h4>}
            <div className="section-item__date-location-container">

              {(item.dateRange.from !== '' || item.dateRange.to !== '') && (
                <div className="section-item__date-container">
                  <p className="section-item__date">
                    {item.dateRange.from}
                    {item.dateRange.to !== '' && ` - ${item.dateRange.to}`}
                  </p>
                </div>
              )}
              {item.location !== '' && (
              <div className="section-item__location-container">
                <MdLocationOn className="section-item__icon-location" />
                <p className="section-item__location">{item.location}</p>
              </div>
              )}

            </div>

            <div className="section-item__text-container">
              {item.text !== '' && <p className="section-item__text">{item.text}</p>}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeSection;
