/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import { setgid } from 'process';
import React, { useEffect, useReducer, useState } from 'react';

import '../../styles/layout_creator.css';

type IState ={
  template:string
  columns:number
  rows:number
  areas:Array<any>
  style:any
}
type ILayout ={
  template:string
  columns:number
  rows:number
  areas:Array<any>
  style:any
}
type props ={
  layout : ILayout
  UpdateLayout:(payload:any)=>any
  setEditing: (b:boolean)=>void
}
function PrintTemplate(_layout:IState):any {
  let result:string = '"';
  let count:number = 1;
  for (let i = 0; i < _layout.areas.length; i += 1) {
    result += ` _${_layout.areas[i]}`;
    if (count > _layout.columns - 1) {
      result += '"\n"';
      count = 0;
    }
    count += 1;
  }
  result = result.slice(0, -1);
  result = result.trim();
  const finalTemplate = result;
  return finalTemplate;
}
function calculateTemplate(col:number, row:number):any {
  const array:Array<any> = [];
  let count:number = 0;
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      array.push(`area${count}`);
      count += 1;
    }
  }
  return array;
}
function layoutCreatorReducer(state:IState, action:any):any {
  let newState:IState = {
    template: '',
    columns: 0,
    rows: 0,
    areas: [],
    style: undefined,
  };
  switch (action.type) {
    case 'INIT':
      newState = { ...action.payload, template: PrintTemplate(action.payload) };
      return newState;
    case 'UPDATE_COLUMNS':
      newState = {
        ...state,
        columns: action.payload,
        areas: calculateTemplate(action.payload, state.rows),
      };
      newState = { ...newState, template: PrintTemplate(newState) };
      return newState;
    case 'UPDATE_ROWS':
      newState = {
        ...state,
        rows: action.payload,
        areas: calculateTemplate(state.columns, action.payload),
      };
      newState = { ...newState, template: PrintTemplate(newState) };
      return newState;
    case 'UPDATE_AREA_NAME':

      newState = { ...state, areas: action.payload };
      newState = { ...newState, template: PrintTemplate(newState) };
      return newState;

    default:
      return null;
  }
}

export default function LayoutCreator({
  layout, UpdateLayout, setEditing,
}:props) {
  const [state, dispatch] = useReducer(layoutCreatorReducer, {});

  useEffect(() => {
    dispatch({ type: 'INIT', payload: layout });
  }, [layout]);

  return (
    <div className="container">
      <div
        className="layout-creator"
        style={{
          gridTemplateAreas: state.template,
          gridTemplateColumns: `repeat(${state?.columns},1fr)`,
          gridTemplateRows: `repeat(${state?.rows},1fr)`,
        }}
      >
        {state?.areas?.map((area: string, index: number) => (
          <div
            key={`_${index}`}
            className="area"
            style={{ gridArea: `_${area}` }}
          >
            <input
              type="text"
              onChange={(e) => {
                const newAreas = state.areas.map((item: string, jindex: number) => {
                  if (jindex === index) { item = e.currentTarget.value; }
                  return item;
                });
                dispatch({ type: 'UPDATE_AREA_NAME', payload: newAreas });
              }}
              defaultValue={`${area}`}
            />
          </div>
        ))}
      </div>
      <div className="edit-box">
        <div className="inputs">
          <p>columns</p>
          <input onChange={(e) => dispatch({ type: 'UPDATE_COLUMNS', payload: Number(e.currentTarget.value) })} type="number" min={1} defaultValue={state?.columns} />
          <p>rows</p>
          <input onChange={(e) => dispatch({ type: 'UPDATE_ROWS', payload: Number(e.currentTarget.value) })} type="number" min={1} defaultValue={state?.rows} />
        </div>
        <button type="button" onClick={() => { UpdateLayout(state); setEditing(false); }}>Save</button>
        <button type="button" onClick={() => setEditing(false)}>Cancel</button>
      </div>
    </div>
  );
}
