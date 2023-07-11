import React, { useState } from 'react'
import SideBar from '../components/sideBar/sideBarProject.tsx'
import SideBarPage from './sideBarPage.tsx'

function Test() {
  // 프로젝트 옵션 리스트 이벤트
  const [projectOption, setProjectOption] = useState<String>();

  const changeProjectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setProjectOption(value)
  }

  return (
    <div>
      Test Test
      <SideBarPage />
    </div>

  )
}

export default Test;