/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import '../../styles/main_page.css';
import React, { useReducer } from 'react';

import { ResumePreview } from '../resume_preview/resume_preview';
import { BuilderForm } from '../builder_form/builder_form.tsx';

const initialState = {
  mainSection: {
    name: 'Leandro Nicolás',
    lastName: 'Medina',
    job: 'Fullstack dev',
    area: '',
  },
  sections: [{}],
  layout: {
    template: '.',
    columns: 1,
    rows: 1,
    areas: [{ content: 'a' }],
  },
};

const resumeReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case 'ADD_SECTION':
      return null;
    case 'UPDATE_SECTION':
      newState = { ...state, mainSection: action.payload };
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
      <BuilderForm state={state} UpdateField={((payload) => dispatch({ type: 'UPDATE_SECTION', payload }))} AddSection={(payload) => dispatch({ type: 'ADD_SECTION', payload })} />
      <ResumePreview state={state} UpdateLayout={((payload) => dispatch({ type: 'UPDATE_LAYOUT', payload }))} />
    </div>
  );
}

export default MainPage;
