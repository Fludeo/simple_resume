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

      <h2>{`${mainSection.name} ${mainSection.lastName}`}</h2>
      <h3>{mainSection.job}</h3>

    </div>
  );
}

export default MainSection;
