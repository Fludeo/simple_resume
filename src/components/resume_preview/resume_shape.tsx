import React from 'react';
import '../../styles/shapes/resume_shapes.css';

type IShape ={
    uuid:string
    type:string,
    scale:{x:number, y:number},
    position:{x:number, y:number},
    layer:number
    color:string,
    rotation:number,
  }

type props ={
    shape:IShape
}

function ResumeShape({ shape }:props) {
  return (
    <div
      className="square"
      style={{
        top: `${shape.position.x}mm`,
        left: `${shape.position.y}mm`,
        backgroundColor: `${shape.color}`,
        zIndex: `${shape.layer}`,
        transformOrigin: 'center',
        transform: `rotate(${shape.rotation}deg) scale(${shape.scale.x},${shape.scale.y}) `,
      }}
    />
  );
}

export default ResumeShape;
