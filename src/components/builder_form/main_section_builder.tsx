/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { HiOutlineTemplate } from 'react-icons/hi';
import '../../styles/main_section_builder.css';
import { v4 as uuidv4 } from 'uuid';

type props = {
  data:any,
  areas:Array<any>
  UpdateField: (payload :any)=>void
}

type IMainSection = {
  area:string
  name:string
  lastName:string
  job:string

}

export default function MainSectionBuilder({
  data, areas, UpdateField,
}:props) {
  const [fields, setFields] = useState<IMainSection>(data);
  const [gridAreas, setGridAreas] = useState <Array<any>>([]);
  useEffect(() => {
    setGridAreas([...new Set(areas)]);
    setFields(data);
  }, [data, areas]);
  return (
    <div className="main-section-builder">
      <div className="main-section-builder__title-container">
        <h2 className="main-section-builder__title">Presentation</h2>
      </div>

      <div className="main-section-builder__name-container">
        <label htmlFor="name" className="main-section-builder__name-label">
          Name
        </label>
        <input
          id="name"
          className="main-section-builder__name"
          type="text"
          defaultValue={fields.name != null ? fields.name : ''}
          onChange={(e) => UpdateField({ ...fields, name: e.currentTarget.value })}
        />

      </div>
      <div className="main-section-builder__lastname-container">
        <label htmlFor="lastname" className="main-section-builder__lastname-label">
          Lastname
        </label>
        <input
          id="lastname"
          className="main-section-builder__lastname"
          type="text"
          defaultValue={fields.lastName != null ? fields.lastName : ''}
          onChange={(e) => UpdateField({ ...fields, lastName: e.currentTarget.value })}
        />

      </div>
      <div className="main-section-builder__job-container">
        <label htmlFor="job" className="main-section-builder__job-label">
          Job
        </label>
        <input
          id="job"
          className="main-section-builder__job"
          type="text"
          defaultValue={fields.job != null ? fields.job : ''}
          onChange={(e) => UpdateField({ ...fields, job: e.currentTarget.value })}
        />

      </div>
      <div className="main-section-builder__area-container">
        <HiOutlineTemplate className="main-section-builder__area-icon">  </HiOutlineTemplate>

        <select
          className="main-section-builder__area"
          defaultValue={fields.area}
          onChange={(e) => UpdateField({ ...fields, area: `_${e.currentTarget.value}` })}
        >
          <option
            value=""
          >
            select
          </option>
          {gridAreas.filter((area, index) => {
            if
            (gridAreas.indexOf(area) === index) { return area; } return null;
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

      </div>
      <div className="main-section-builder__buttons-container" />

    </div>
  );
}
