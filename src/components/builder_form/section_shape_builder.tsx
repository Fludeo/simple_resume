/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import '../../styles/section_shapes_builder.css';
import { v4 as uuidv4 } from 'uuid';
import SectionShape from './section_shape';

type IShape ={
  uuid:string
  type:string,
  scale:{x:number, y:number},
  position:{x:number, y:number},
  layer:number;
  color:string,
  rotation:number,
}
  type props = {
      data:Array<IShape>
      UpdateField:(payload:any)=>void
  }

function SectionBackgroundShapes({ data, UpdateField }:props) {
  const [shapes, setShapes] = useState<Array<IShape>>(data);

  const AddShape = () => {
    const newShapes = [...shapes];
    newShapes?.push({
      uuid: uuidv4(), type: '', layer: 1, rotation: 0, scale: { x: 1, y: 1 }, position: { x: 1, y: 1 }, color: '#212121',
    });
    UpdateField(newShapes);
  };

  useEffect(() => {
    setShapes(data);
  }, [data]);
  return (
    <div className="section-shapes">
      <input type="text" readOnly value="Background shapes" className="section-shapes__title" />
      {shapes?.map((shape:IShape, index:number) => (
        <SectionShape
          key={shape.uuid}
          shape={shape}
          DeleteShape={(payload) => {
            const updatedShapes = [...shapes];
            updatedShapes.splice(updatedShapes.indexOf(payload), 1);
            UpdateField(updatedShapes);
          }}
          UpdateField={(payload) => {
            const updatedShapes:Array<any> = [...shapes];
            updatedShapes[index][payload.field as keyof IShape] = payload.value;
            UpdateField(updatedShapes);
          }}
        />
      ))}
      <div className="section-shapes-builder__add-shape-icon-container">
        <FiPlusSquare
          onClick={() => AddShape()}
          type="button"
          className="section-shapes-builder__add-shape-icon section-shapes-builder__add-shape-icon--hover"
        />
      </div>

    </div>
  );
}

export default SectionBackgroundShapes;
