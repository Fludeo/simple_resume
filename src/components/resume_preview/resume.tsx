/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */

import React, { useEffect, useState } from 'react';
import '../../styles/resume.css';
import MainSection from '../builder_form/resume_main_section';
import ResumeSection from '../builder_form/resume_section';

type props = {
  state:any
}

type ILayout={
  template:string
  columns:number
  rows:number
  areas:Array<any>

}

export function Resume({ state }:props) {
  return (
    <div
      className="resume"
      style={{ gridTemplateAreas: state.layout?.template, gridTemplateColumns: `repeat(${state.layout?.columns},1fr)`, gridTemplateRows: `repeat(${state.layout?.rows},1fr)` }}
    >
      {[...new Set(state.layout.areas)].map((zone, index:number) => (
        <div key={`${index}`} style={{ gridArea: `_${zone}` }}>
          {state.sections.map((section:any, sectionIndex:number) => (`_${zone}` === `${section.area}`
            && (
            <ResumeSection
              key={sectionIndex}
              section={section}
            />
            )
          ))}
        </div>
      ))}

    </div>
  );
}

export default Resume;
