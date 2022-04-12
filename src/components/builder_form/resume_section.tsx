import React from 'react';

type props = {
    title:string,
    list: Array<string>,

}

function ResumeSection({ title, list }:props) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {list.map((text) => <li key={list.indexOf(text)}>{text}</li>)}
      </ul>
    </div>
  );
}

export default ResumeSection;
