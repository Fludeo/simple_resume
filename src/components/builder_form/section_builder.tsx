/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import '../../styles/section_builder.css';

type props = {
  data:any,

    UpdateField: (payload :any)=>void
}
type ISection ={
    title:string,
    items:Array<{
            item:string,
            text:string,
            location:string,
            dateRange:{
            from:Date,
            to:Date}}>
};

export default function SectionBuilder({
  data, UpdateField,
}:props) {
  const [fields, setFields] = useState(data);
  const [editTitle, setEditTitle] = useState(false);

  useEffect(() => {
    setFields(data);
  }, [data]);

  return (
    <div className="section-builder">

      <div className="col-1">
        {editTitle
          ? <input onChange={(e) => UpdateField({ ...fields, title: e.currentTarget.value })} type="text" defaultValue={fields.title} />
          : <p>{fields.title}</p>}
        <button type="button" onClick={() => setEditTitle(!editTitle)}>edit</button>

      </div>

    </div>
  );
}
