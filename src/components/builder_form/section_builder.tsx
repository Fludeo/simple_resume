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
  const [fields, setFields] = useState<ISection>(data as ISection);
  const [editTitle, setEditTitle] = useState(false);

  function AddItem() {
    const newItems = [...fields.items];
    newItems.push({
      item: 'New item',
      text: 'subtext',
      location: '',
      dateRange: { from: '', to: '' },
    });
    UpdateField({ ...fields, items: newItems });
  }

  useEffect(() => {
    setFields(data);
  }, [data]);

  return (

    <div className="section-builder">

      <div className="section-builder__title-container">
        {editTitle
          ? <input onChange={(e) => UpdateField({ ...fields, title: e.currentTarget.value })} type="text" defaultValue={fields.title} />
          : <h2 className="section-builder__title">{fields.title}</h2>}
        <button type="button" onClick={() => setEditTitle(!editTitle)}>edit</button>
      </div>
      <div className=".main-section-builder__area-container">
        <label className="main-section-builder__area-label">
          Area
          <select
            className="main-section-builder__area"
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
          <div key={`${index}`} className="section-builder-item">

            <div className="section-builder-item__item-container">
              <label className="section-builder-item__item-label">
                job, skill, place, etc
                <input
                  onChange={(e) => {
                    const updatedItems = [...fields.items];
                    updatedItems[index].item = e.currentTarget.value;
                    UpdateField({ ...fields, items: updatedItems });
                  }}
                  className="section-builder-item__item"
                  type="text"
                  defaultValue={item.item}
                />
              </label>
            </div>
            <div className="section-builder-item__location-container">
              <label className="section-builder-item__location-label">
                location
                <input
                  onChange={(e) => {
                    const updatedItems = [...fields.items];
                    updatedItems[index].location = e.currentTarget.value;
                    UpdateField({ ...fields, items: updatedItems });
                  }}
                  className="section-builder-item__location"
                  type="text"
                  defaultValue={item.location}
                />
              </label>
            </div>
            <div className="section-builder-item__description-container">
              <label className="section-builder-item__description-label">
                brief description
                <textarea
                  onChange={(e) => {
                    const updatedItems = [...fields.items];
                    updatedItems[index].text = e.currentTarget.value;
                    UpdateField({ ...fields, items: updatedItems });
                  }}
                  className="section-builder-item__description"
                  defaultValue={item.text}
                />
              </label>
            </div>

            <div className="section-builder-item__date-container">
              <label className="section-builder-item__date-label">
                from date to date
                <div className="section-builder-item__date-input-wrapper">
                  <input
                    onChange={(e) => {
                      const updatedItems = [...fields.items];
                      updatedItems[index].dateRange.from = e.currentTarget.value;
                      UpdateField({ ...fields, items: updatedItems });
                    }}
                    className="section-builder-item__date-from"
                    type="text"
                    defaultValue={item.dateRange.from}
                  />
                  <input
                    onChange={(e) => {
                      const updatedItems = [...fields.items];
                      updatedItems[index].dateRange.to = e.currentTarget.value;
                      UpdateField({ ...fields, items: updatedItems });
                    }}
                    className="section-builder-item__date-to"
                    type="text"
                    defaultValue={item.dateRange.to}
                  />
                </div>
              </label>
            </div>

          </div>
        ))}
      </div>
      <div className="section-builder__add-item-button-container">
        <button
          onClick={() => AddItem()}
          type="button"
          className="section-builder__add-item-button"
        >
          Add item

        </button>
      </div>
    </div>

  );
}
