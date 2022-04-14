/* eslint-disable react/no-array-index-key */
import React from 'react';

type Iitem = {

  item:string,
  text:string,
  location:string,
  dateRange:{
  from:string,
  to:string}
}
type ISection = {
  area:string
  title:string,
  items: Array<Iitem>,
}

type props = {
  section:ISection
}
function ResumeSection({ section }:props) {
  return (
    <div>
      <h3>{section.title}</h3>
      <div>
        {section.items.map((item:Iitem, index) => <div key={index}>{item.item}</div>)}
      </div>
    </div>
  );
}

export default ResumeSection;
