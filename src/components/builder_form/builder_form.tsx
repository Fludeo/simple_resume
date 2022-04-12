/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import '../../styles/builder_form.css';
import MainSectionBuilder from './main_section_builder';
import SectionBuilder from './section_builder';

type props ={
  AddSection: ()=>any,
  UpdateField:(payload:any)=>any,
  state: any
};

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

export function BuilderForm({ UpdateField, AddSection, state }:props) {
  return (
    <div className="builder-form">
      <MainSectionBuilder
        data={state.mainSection}
        areas={state.layout.areas}
        UpdateField={(mainSection:any) => UpdateField(mainSection)}
      />
      <div>

        {state.sections.map((section:ISection, index:number) => (
          <SectionBuilder
            key={`${section.title}${index}`}
            UpdateField={(payload:any) => UpdateField(payload)}
            data={section}
          />
        ))}
        <button type="button" onClick={AddSection}>Add section</button>
      </div>
    </div>
  );
}

export default BuilderForm;
