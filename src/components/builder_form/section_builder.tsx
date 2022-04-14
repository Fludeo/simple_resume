/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import '../../styles/section_builder.css';

type props = {
  data:any,
    UpdateField: (payload :any)=>void
    areas:Array<any>
}

type Iitem ={

  item:string,
  text:string,
  location:string,
  dateRange:{
  from:string,
  to:string}
}
type ISection ={
    area:string
    title:string,
    items:Array<Iitem>
};

export default function SectionBuilder({
  data, areas, UpdateField,
}:props) {
  const [fields, setFields] = useState(data);
  const [editTitle, setEditTitle] = useState(false);

  useEffect(() => {
    setFields(data);
  }, [data]);

  return (
    <div className="section-builder">

      <div className="section-builder__title">
        {editTitle
          ? <input onChange={(e) => UpdateField({ ...fields, title: e.currentTarget.value })} type="text" defaultValue={fields.title} />
          : <h2>{fields.title}</h2>}
        <button type="button" onClick={() => setEditTitle(!editTitle)}>edit</button>

        <label className="main-section-builder__area-label">
          Area
          <select
            className="main-section-builder__area-select"
            defaultValue={fields.area}
            onChange={(e) => UpdateField({ ...fields, area: `_${e.currentTarget.value}` })}
          >
            {areas.filter((area, index) => {
              if
              (areas.indexOf(area) === index) { return area; } return null;
            })
              .map((area, index) => (
                <option
                  key={`${area}${index}`}
                  value={area}
                >
                  {area}
                </option>
              ))}
          </select>

        </label>
      </div>
      <div className="section-builder__items">

        {fields.items.map((item:Iitem, index:number) => (
          <div key={`${item.item}${index}`} className="item">

            <div className="item__item-container">
              <label className="item__item-label">
                job, skill, place, etc
                <input className="item__item" type="text" defaultValue={item.item} />
              </label>
            </div>
            <div className="item__location-container">
              <label className="item__location-label">
                location
                <input className="item__location" type="text" defaultValue={item.location} />
              </label>
            </div>
            <div className="item__description-container">
              <label className="item__description-label">
                brief description
                <textarea className="item__description" defaultValue={item.text} />
              </label>
            </div>

            <div className="item__date-container">
              <label className="item__date-label">
                from date to date
                <div className="item__date-input-wrapper">
                  <input className="item__date-from" type="text" defaultValue={item.dateRange.from} />

                  <input className="item__date-to" type="text" defaultValue={item.dateRange.to} />
                </div>
              </label>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
