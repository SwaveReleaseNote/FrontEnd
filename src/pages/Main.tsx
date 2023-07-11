import React, { useState, useEffect } from 'react';
import { useRecoilValue , useRecoilState} from 'recoil';
import { loginState } from '../context/atom';
import ProjectCard from '../components/ProjectCard';
const cardData = [
  {
    projectName: "Title 1",
    projectDescription: "Text 1.1",
    projectMemberNumber : 3,
    projectRecentRelease: "1.0",
    projectCreateDate:"2023-07-07T00:00:00.000+00:00",
  },
  {
    projectName: "Title 2",
    projectDescription: "Text 2.1",
    projectMemberNumber : 3,
    projectRecentRelease: "1.1",
    projectCreateDate:"2023-07-07T00:00:00.000+00:00",
  },
  // Add more card data objects as needed
];
function Main() {
  const [isLogined,setIsLogined] = useRecoilState(loginState);
  console.log(isLogined);
  return (
    <>
    <div>Main</div>
    {cardData.map((card, index) => (
        <ProjectCard
          key={index}
          projectName={card.projectName}
          projectDescription={card.projectDescription}
          projectMemberNumber={card.projectMemberNumber}
          projectRecentRelease={card.projectRecentRelease}
          projectCreateDate={card.projectCreateDate}
        />
      ))}
    </>
  )
}

export default Main