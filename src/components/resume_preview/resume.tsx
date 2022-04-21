/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */

import React, {
  ForwardedRef, Ref, useEffect, useState,
} from 'react';
import '../../styles/resume.css';
import { v4 as uuidv4 } from 'uuid';
import MainSection from './resume_main_section';
import ResumeSection from '../resume_preview/resume_section';

type props = {
  state:any
  printable:boolean

}

type ILayout={
  template:string
  columns:number
  rows:number
  areas:Array<any>

}

const Resume = React.forwardRef(({ state, printable }:props, ref:Ref<HTMLDivElement>) => {
  const [style, setStyle] = useState < React.CSSProperties>();

  function getStyles(layout:ILayout):void {
    const grid:React.CSSProperties = {
      gridTemplateAreas: `${state.layout?.template}`,
      gridTemplateColumns: `repeat(${state.layout?.columns},1fr)`,
      gridTemplateRows: `repeat(${state.layout?.rows},1fr)`,
    };
    setStyle(grid);
  }
  useEffect(() => {
    getStyles(state.layout);
  }, [state.layout]);

  return (

    <div
      ref={ref}
      className={printable ? 'printable-resume' : 'resume'}
      style={style}
    >

      {[...new Set(state.layout.areas)].map((zone) => (
        <div className={printable ? '' : 'zone'} key={uuidv4()} style={{ gridArea: `_${zone}`, overflow: 'hidden' }}>

          {`_${zone}` === `${state.mainSection.area}` && <MainSection mainSection={state.mainSection} />}

          {state.sections.map((section:any) => (
            `_${zone}` === `${section.area}`
            && (
            <ResumeSection
              key={section.uuid}
              section={section}
            />
            )
          ))}
        </div>
      ))}
    </div>

  );
});

export default Resume;
