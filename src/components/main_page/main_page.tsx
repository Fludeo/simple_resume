/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import '../../styles/main_page.css';
import React, { useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { ResumePreview } from '../resume_preview/resume_preview';
import { BuilderForm } from '../builder_form/builder_form';

const initialState = {
  mainSection: {
    name: 'Name',
    lastName: 'Lastname',
    job: 'Job',
    area: '_area',
  },
  backgroundShapes: [{
    uuid: uuidv4(), type: '', layer: 1, rotation: 0, scale: { x: 1, y: 1 }, position: { x: 0, y: 0 }, color: '#212121',
  }],
  sections: [{
    uuid: uuidv4(),
    area: '_area',
    title: 'Title',
    items: [{
      uuid: uuidv4(),
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
    areas: ['area'],
  },
};

type ActionType =
 |{ type:'ADD_SECTION', payload:any}
 |{ type:'UPDATE_MAIN_SECTION', payload:any}
 |{ type:'UPDATE_SHAPE_SECTION', payload:any}
 |{ type: 'UPDATE_SECTION', payload:any}
 |{ type:'UPDATE_LAYOUT', payload:any}

const resumeReducer:React.Reducer<any, ActionType> = (state, action) => {
  let newState = {};
  switch (action.type) {
    case 'ADD_SECTION':
      newState = { ...state, sections: action.payload };
      console.log(newState);
      return newState;
    case 'UPDATE_MAIN_SECTION':

      newState = { ...state, mainSection: action.payload };
      console.log(newState);
      return newState;
    case 'UPDATE_SHAPE_SECTION':

      newState = { ...state, backgroundShapes: action.payload };
      console.log(newState);
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
      return state;
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
        UpdateShapeSection={((payload) => dispatch({ type: 'UPDATE_SHAPE_SECTION', payload }))}
        AddSection={(payload) => dispatch({ type: 'ADD_SECTION', payload })}
      />
      <ResumePreview state={state} UpdateLayout={((payload) => dispatch({ type: 'UPDATE_LAYOUT', payload }))} />
    </div>
  );
}

export default MainPage;
