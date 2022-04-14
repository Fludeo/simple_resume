/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import '../../styles/builder_form.css';
import MainSectionBuilder from './main_section_builder';
import SectionBuilder from './section_builder';

type ISection = {
    title:string,
    items:Array<{
                  item:string,
                  text:string,
                  location:string,
                  dateRange:{
                            from:string,
                            to:string}
                }>
};
type props ={
  AddSection: (payload:Array<ISection>)=>any,
  UpdateSection:(payload:any)=>any,
  UpdateMainSection:(payload:any)=>any,
  state: any
};
export function BuilderForm({
  UpdateSection, UpdateMainSection, AddSection, state,
}:props) {
  function AddSectionToState():void {
    const newSections = [...state.sections, {
      title: 'Title',
      items: [{
        item: 'Item-1',
        text: 'Subtext',
        location: '',
        dateRange: {
          from: '',
          to: '',
        },
      }],
    },
    ];
    AddSection(newSections);
  }
  return (
    <div className="builder-form">
      <MainSectionBuilder
        data={state.mainSection}
        areas={state.layout.areas}
        UpdateField={(mainSection:any) => UpdateMainSection(mainSection)}
      />
      <div>

        {state.sections.map((section:ISection, index:number) => (
          <SectionBuilder
            key={`${index}`}
            UpdateField={(payload:ISection) => {
              const updatedSections = [...state.sections];
              updatedSections[index] = payload;
              UpdateSection(updatedSections);
            }}
            data={section}
            areas={state.layout.areas}
          />
        ))}
        <button type="button" onClick={() => AddSectionToState()}>Add section</button>
      </div>
    </div>
  );
}

export default BuilderForm;
