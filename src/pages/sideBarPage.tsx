import React, { ReactNode, useState } from 'react';
import SideBarProject from '../components/sideBar/sideBarProject';
import SideBarNote from '../components/sideBar/sideBarNote';
import { data } from '../data/data.json'

type releaseNote = {
  id: number;
  version: string;
};

type projectType = {
  id: number;
  projectName: String;
  releaseNotes: releaseNote[];
};

function sideBarPage() {
  // 프로젝트 옵션 리스트 이벤트
  const [projectOption, setProjectOption] = useState<String>();
  const [myProject, setMyProject] = useState<projectType[]>(data.projects);
  const [releaseNotesInCurrentProject, setReleaseNotesInCurrentProject] = useState<projectType[]>();

  const changeProjectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    var nowProjectName: string = value;
    setProjectOption(value);

    // 현재 내가 선택한 option의 프로젝트만 받아 올 것
    // 그 선택한 option 프로젝트가 위의 value 안에 담겨 있다.
    const currentProject: projectType[] = myProject.filter((value: projectType) => value.projectName === nowProjectName);
    setReleaseNotesInCurrentProject(currentProject);
  }


  var projects = myProject.map((project) => <SideBarProject myProject={project} />);

  var notes = releaseNotesInCurrentProject?.map((note: projectType) =>
    note.releaseNotes.map((release) => <SideBarNote myNote={release} />));


  return (
    <div>
      {/* 반응형 : 작은 화면일 때 메뉴사라지고 버튼 생성 */}
      <button type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      {/* 메뉴 부분 */}
      <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              {/* 프로젝트 리스트 옵션 부분 */}
              <select onChange={changeProjectOption} className='flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'>
                <option selected disabled className='flex-1 ml-3 text-left whitespace-nowrap'>
                  백에서 접근한 현재 프로젝트
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 1">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </option>
                {projects}
              </select>
            </li>
            <li>
              <a href="#" className="inline-block align-baseline items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                {notes}
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

sideBarPage.defaultProps = {
  mark: '!'
};

export default sideBarPage;
