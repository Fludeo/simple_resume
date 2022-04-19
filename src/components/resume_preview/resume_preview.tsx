/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import '../../styles/resume_preview.css';
import React, {
  useRef,
  useEffect, useState,
} from 'react';
import { HiOutlineTemplate } from 'react-icons/hi';
import { useReactToPrint } from 'react-to-print';
import Resume from './resume';
import LayoutCreator from './layout_creator';

type props ={
  state:any
  UpdateLayout: (payload:any)=>any
}

export function ResumePreview({ state, UpdateLayout }:props) {
  const [editing, setEditing] = useState(false);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {

  }, [state.layout]);
  return (
    <div className="resume-preview">
      <div className="resume-preview__main-container">

        {!editing && (
        <div className="resume-preview__top-section ">

          <HiOutlineTemplate className="resume-preview__button-icon resume-preview__button-icon--hover" onClick={() => setEditing(!editing)}> </HiOutlineTemplate>

        </div>
        )}

        {editing ? (
          <LayoutCreator
            setEditing={setEditing}
            UpdateLayout={(payload) => UpdateLayout(payload)}
            layout={state.layout}
          />
        )
          : (
            <Resume printable={false} state={state} />
          ) }
        <button type="button" onClick={handlePrint}>print</button>
        <div style={{ display: 'none' }}>
          <Resume printable ref={componentRef} state={state} />
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
// <Resume printable={false} state={state}/>
