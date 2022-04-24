/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import '../../styles/builder_form.css';
import { v4 as uuidv4 } from 'uuid';
import MainSectionBuilder from './main_section_builder';
import SectionBuilder from './section_builder';
import SectionBackgroundShapes from './section_shape_builder';

type ISection = {
    uuid:string,
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
  UpdateShapeSection: (payload:any)=>any
  state: any
};
export function BuilderForm({
  UpdateShapeSection,
  UpdateSection, UpdateMainSection, AddSection, state,
}:props) {
  function AddSectionToState():void {
    const newSections = [...state.sections, {
      uuid: uuidv4(),
      title: 'Title',
      items: [{
        uuid: uuidv4(),
        item: 'Item-1',
        text: '',
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
        UpdateField={(mainSection:typeof state.mainSection) => UpdateMainSection(mainSection)}
      />

      <div className="section-wrapper">
        {state.sections.map((section:ISection, index:number) => (
          <SectionBuilder
            key={section.uuid}
            UpdateField={(payload:ISection) => {
              const updatedSections = [...state.sections];
              updatedSections[index] = payload;
              UpdateSection(updatedSections);
            }}
            data={section}
            areas={state.layout.areas}
          />
        ))}
      </div>
      <div className="builder-form__buttons-container">
        <FiPlus className="builder-form__add-section-icon builder-form__add-section-icon--hover" type="button" onClick={() => AddSectionToState()}>Add section</FiPlus>
      </div>
      <SectionBackgroundShapes
        data={state.backgroundShapes}
        UpdateField={(payload: typeof state.backgroundShapes) => UpdateShapeSection(payload)}
      />

    </div>
  );
}

export default BuilderForm;
