import React, { useState } from 'react';
import '../../styles/section_shape.css';
import { GiClockwiseRotation, GiAnticlockwiseRotation } from 'react-icons/gi';
import {
  CgArrowsH, CgArrowsV, CgShapeCircle, CgShapeSquare, CgShapeTriangle,
} from 'react-icons/cg';
import { MdLayers } from 'react-icons/md';
import { SketchPicker } from 'react-color';
import { HiOutlineColorSwatch } from 'react-icons/hi';
import { FiDelete } from 'react-icons/fi';

type IShape ={
    uuid:string
    type:string,
    scale:{x:number, y:number},
    position:{x:number, y:number},
    color:string,
    rotation:number,
    layer:number,
  }
type props = {
    shape:IShape,
    UpdateField:(payload:any)=>void
    DeleteShape:(payload:any)=>void

}

function SectionShape({ DeleteShape, UpdateField, shape }:props) {
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  const [deleteIcon, setDeleteIcon] = useState<boolean>(false);

  const HandleColor = (color: { hex: any; }) => {
    UpdateField({ value: color.hex, field: 'color' });
  };
  return (
    <div
      className="section-shape"
      onMouseEnter={() => setDeleteIcon(true)}
      onMouseLeave={() => setDeleteIcon(false)}
    >
      <div className="section-shape__type-container">
        <CgShapeCircle
          className={shape.type === 'circle' ? 'section-shape__type-icon--active section-shape__type-icon--hover' : 'section-shape__type-icon section-shape__type-icon--hover'}
          onClick={() => UpdateField({ value: 'circle', field: 'type' })}
        />
        <CgShapeSquare
          className={shape.type === 'square' ? 'section-shape__type-icon--active section-shape__type-icon--hover'
            : 'section-shape__type-icon section-shape__type-icon--hover'}
          onClick={() => UpdateField({ value: 'square', field: 'type' })}
        />
        <CgShapeTriangle
          className={shape.type === 'triangle' ? 'section-shape__type-icon--active section-shape__type-icon--hover'
            : 'section-shape__type-icon section-shape__type-icon--hover'}
          onClick={() => { UpdateField({ value: 'triangle', field: 'type' }); }}
        />
        <HiOutlineColorSwatch onClick={() => setColorPicker(!colorPicker)} />
        { colorPicker && (
          <div style={{ position: 'absolute', right: '10rem' }}>
            <SketchPicker
              color={shape.color}
              onChangeComplete={HandleColor}
            />
          </div>
        )}
      </div>
      <div>
        <CgArrowsH />
        <input className="section-shape__scale" type="number" onChange={(e) => UpdateField({ value: { ...shape.scale, x: Number(e.currentTarget.value) }, field: 'scale' })} />
        <CgArrowsV />
        <input className="section-shape__scale" type="number" onChange={(e) => UpdateField({ value: { ...shape.scale, y: Number(e.currentTarget.value) }, field: 'scale' })} />
      </div>
      <div>
        <CgArrowsV />
        <input className="section-shape__scale" type="number" onChange={(e) => UpdateField({ value: { ...shape.position, x: Number(e.currentTarget.value) }, field: 'position' })} />
        <CgArrowsH />
        <input className="section-shape__scale" type="number" onChange={(e) => UpdateField({ value: { ...shape.position, y: Number(e.currentTarget.value) }, field: 'position' })} />
        <MdLayers />
        <input type="number" min={0} className="section-shape__rotation" onChange={(e) => UpdateField({ value: Number(e.currentTarget.value), field: 'layer' })} />
      </div>
      <div className="section-shape__edit-container">
        <GiAnticlockwiseRotation
          className="section-shape__rotation-icon"
          onClick={() => UpdateField({ value: shape.rotation - 1, field: 'rotation' })}
        />
        <input type="number" onChange={(e) => UpdateField({ value: Number(e.currentTarget.value), field: 'rotation' })} value={shape.rotation} className="section-shape__rotation" />
        <GiClockwiseRotation
          className="section-shape__rotation-icon"
          onClick={() => UpdateField({ value: shape.rotation + 1, field: 'rotation' })}
        />
      </div>
      <FiDelete
        onClick={() => DeleteShape(shape)}
        onMouseEnter={() => setDeleteIcon(true)}
        visibility={deleteIcon ? 'visible' : 'hidden'}
        className="section-shape__delete-icon
                    section-shape__delete-icon--hover"
      />
    </div>
  );
}

export default SectionShape;
