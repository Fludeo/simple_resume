/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../../styles/main_section_builder.css';

type props = {
  data:any,
  areas:Array<any>
  UpdateField: (payload :any)=>void
}

type IMainSection = {
  name:string
  lastName:string
  job:string
  area:string

}

export default function MainSectionBuilder({
  data, areas, UpdateField,
}:props) {
  const [fields, setFields] = useState<IMainSection>(data);
  const [gridAreas, setGridAreas] = useState <Array<any>>([]);
  console.log(fields);
  useEffect(() => {
    setGridAreas([...new Set(areas.map((content) => content))]);
    setFields(data);
  }, [data, areas]);
  return (
    <div className="main-section-builder">

      <div className="col-1">
        <select
          defaultValue={fields.area}
          onChange={(e) => UpdateField({ ...fields, area: `_${e.currentTarget.value}` })}
        >
          {gridAreas.filter((area, index) => {
            if
            (gridAreas.indexOf(area) === index) { return area; } return null;
          })
            .map((area, index) => (
              <option
                key={`${area.content}${index}`}
                value={area.content}
              >
                {area.content}
              </option>
            ))}
        </select>
        <p>Name</p>
        <input
          type="text"
          defaultValue={fields.name != null ? fields.name : ''}
          onChange={(e) => UpdateField({ ...fields, name: e.currentTarget.value })}
        />
        <p>Job</p>
        <input
          type="text"
          defaultValue={fields.job != null ? fields.job : ''}
          onChange={(e) => UpdateField({ ...fields, job: e.currentTarget.value })}
        />

      </div>
      <div className="col-2">
        <p>Lastname</p>
        <input
          type="text"
          defaultValue={fields.lastName != null ? fields.lastName : ''}
          onChange={(e) => UpdateField({ ...fields, lastName: e.currentTarget.value })}
        />

      </div>

    </div>
  );
}
