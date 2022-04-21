import React from 'react';

type IMainSection = {
  area:string
  name:string
  lastName:string
  job:string

}
type props ={
    mainSection:IMainSection
}

function MainSection({
  mainSection,
}:props) {
  return (
    <div style={{ gridArea: mainSection.area }}>

      <h1>{`${mainSection.name} ${mainSection.lastName}`}</h1>
      <h2>{mainSection.job}</h2>

    </div>
  );
}

export default MainSection;
