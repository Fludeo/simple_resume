/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import '../../styles/main_page.css';
import React, { useReducer } from 'react';

import { ResumePreview } from '../resume_preview/resume_preview';
import { BuilderForm } from '../builder_form/builder_form.tsx';

const initialState = {
  mainSection: {
    name: 'Name',
    lastName: 'Lastname',
    job: 'Job',
    area: '_area',
  },
  sections: [{
    area: '_area',
    title: 'Title',
    items: [{
      item: 'Item1',
      text: 'Subtext',
      location: '',
      dateRange: {
        from: '',
        to: '',
      },
    }],
  }],
  layout: {
    template: '"_area"',
    columns: 1,
    rows: 1,
    areas: ['_area'],
  },
};

const resumeReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case 'ADD_SECTION':
      newState = { ...state, sections: action.payload };
      console.log(newState);
      return newState;
    case 'UPDATE_MAIN_SECTION':
      console.log(newState);
      newState = { ...state, mainSection: action.payload };
      return newState;
    case 'UPDATE_SECTION':

      newState = { ...state, sections: action.payload };
      console.log(newState);
      return newState;
    case 'UPDATE_LAYOUT':

      newState = { ...state, layout: action.payload };
      console.log(newState);
      return newState;
    default:
      return null;
  }
};

export function MainPage() {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  return (
    <div className="main-page">
      <BuilderForm
        state={state}
        UpdateSection={((payload) => dispatch({ type: 'UPDATE_SECTION', payload }))}
        UpdateMainSection={((payload) => dispatch({ type: 'UPDATE_MAIN_SECTION', payload }))}
        AddSection={(payload) => dispatch({ type: 'ADD_SECTION', payload })}
      />
      <ResumePreview state={state} UpdateLayout={((payload) => dispatch({ type: 'UPDATE_LAYOUT', payload }))} />
    </div>
  );
}

export default MainPage;
