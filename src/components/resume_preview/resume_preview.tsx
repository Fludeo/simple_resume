/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import '../../styles/resume_preview.css';
import React, { useEffect, useState } from 'react';
import { Resume } from './resume';
import LayoutCreator from './layout_creator';

type props ={
  state:any
  UpdateLayout: (payload:any)=>any
}

export function ResumePreview({ state, UpdateLayout }:props) {
  const [editing, setEditing] = useState(false);

  useEffect(() => {

  }, [state.layout]);
  return (
    <div className="resume-preview">
      <div className="main-container">

        {!editing && (
        <div className="top-section">
          <button onClick={() => setEditing(!editing)} type="button">
            {editing ? 'Lock layout' : 'Edit layout'}
          </button>

        </div>
        )}

        {editing ? (
          <LayoutCreator
            setEditing={setEditing}
            UpdateLayout={(payload) => UpdateLayout(payload)}
            layout={state.layout}
          />
        )
          : <Resume state={state} />}

      </div>
    </div>
  );
}

export default ResumePreview;
