/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */

import React, { useEffect, useState } from 'react';
import '../../styles/resume.css';
import MainSection from '../builder_form/resume_main_section';

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
  const [resumeData, setResumeData] = useState<any>({}as any);
  const [style, setStyle] = useState<ILayout>({} as ILayout);
  useEffect(() => {
    setResumeData(state.mainSection);
    setStyle(state.layout);
  }, [state.mainSection, state.layout]);

  return (
    <div
      className="resume"
      style={{ gridTemplateAreas: style?.template, gridTemplateColumns: `repeat(${style?.columns},1fr)`, gridTemplateRows: `repeat(${style?.rows},1fr)` }}
    >
      <MainSection
        area={resumeData.area}
        name={resumeData.name}
        lastName={resumeData.lastName}
        job={resumeData.job}
      />
    </div>
  );
}

export default Resume;
