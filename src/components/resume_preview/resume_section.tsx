/* eslint-disable react/no-array-index-key */
import React from 'react';
import '../../styles/section.css';

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
      <div className="section__title-container">

        {section.title !== '' && <h2 className="section__title">{section.title}</h2>}
      </div>

      <div className="section__items-container">
        {section.items.map((item:Iitem) => (
          <div className="section-item" key={item.uuid}>
            <div className="section-item__item-container">
              <div className="section-item__item-date-container">
                {item.item !== '' && <h4 className="section-item__item">{item.item}</h4>}
                {(item.dateRange.from !== '' || item.dateRange.to !== '') && (
                <div className="section-item__date-container">
                  <p className="section-item__date">
                    {item.dateRange.from}
                    -
                    {item.dateRange.to}
                  </p>
                </div>
                )}

              </div>
              {item.location !== '' && <p className="section-item__location">{item.location}</p>}
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
