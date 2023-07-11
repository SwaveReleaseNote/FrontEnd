import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import "../../styles/sideBar/style.css";
import "../../pages/sideBarPage.tsx"

type projectType = {
  id: number;
  projectName: String;
}

function sideBarProject(props: any) {
  // 프로젝트 옵션 리스트 이벤트
  const [myProject, setMyProject] = useState(props.myProject);

  return (
    <option value={myProject.projectName}>{myProject.projectName}</option>
  )
}

export default sideBarProject;
