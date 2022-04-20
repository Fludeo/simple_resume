/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from 'react';
import '../../styles/section_builder.css';
import { FiEdit, FiPlusSquare } from 'react-icons/fi';
import { HiOutlineTemplate } from 'react-icons/hi';
import { v4 as uuidv4 } from 'uuid';
import SectionItem from './section_item';

type props = {
  data:any,
    UpdateField: (payload :any)=>void
    areas:Array<any>
}

type Iitem ={
  uuid:string
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
  const ref = useRef<HTMLInputElement>({}as HTMLInputElement);

  function AddItem() {
    const newItems = [...fields.items];
    newItems.push({
      uuid: uuidv4(),
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

        <input
          ref={ref}
          className={editTitle
            ? ' section-builder__title-edit--active'
            : 'section-builder__title-edit '}
          readOnly={!editTitle}
          onChange={(e) => UpdateField({ ...fields, title: e.currentTarget.value })}
          onKeyDown={(e) => { if (e.key === 'Enter' && editTitle) { setEditTitle(!editTitle); } }}
          type="text"
          defaultValue={fields.title}
        />
        <FiEdit
          className={editTitle
            ? 'section-builder__edit-icon  section-builder__edit-icon--hover  section-builder__edit-icon--active'
            : 'section-builder__edit-icon  section-builder__edit-icon--hover '}
          type="button"
          onClick={() => {
            ref.current.focus();
            setEditTitle(!editTitle);
          }}
        />
      </div>
      <div className="section-builder__area-container">
        <HiOutlineTemplate className="section-builder__area-icon">  </HiOutlineTemplate>
        <select
          className="section-builder__area"
          defaultValue={fields.area}
          onChange={(e) => UpdateField({ ...fields, area: `_${e.currentTarget.value}` })}
        >
          <option value="">select</option>
          {areas.filter((area, index) => {
            if
            (areas.indexOf(area) === index) { return area; } return null;
          })
            .map((area, index) => (
              <option key={`${area}${index}`} value={area}>
                {area}
              </option>
            ))}
        </select>

      </div>
      <div className="section-builder__items">

        {fields.items.map((item:Iitem, index:number) => (
          <SectionItem
            key={item.uuid}
            item={item}
            UpdateField={(payload) => {
              const updatedItems = [...fields.items];
              updatedItems[index][payload.field as keyof Iitem] = payload.value;
              UpdateField({ ...fields, items: updatedItems });
            }}
            DeleteItem={(payload) => {
              const updatedItems = [...fields.items];
              updatedItems.splice(updatedItems.indexOf(payload), 1);
              UpdateField({ ...fields, items: updatedItems });
            }}
          />
        ))}
      </div>
      <div className="section-builder__add-item-icon-container">
        <FiPlusSquare
          onClick={() => AddItem()}
          type="button"
          className="section-builder__add-item-icon section-builder__add-item-icon--hover"
        />
      </div>
    </div>

  );
}
