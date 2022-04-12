import React from 'react';

type props ={
    name:string,
    lastName:string,
    job:string,
    area:string
}

function MainSection({
  name, lastName, job, area,
}:props) {
  console.log(area);
  return (
    <div style={{ gridArea: area }}>

      <h2>{`${name} ${lastName}`}</h2>
      <h3>{job}</h3>

    </div>
  );
}

export default MainSection;
