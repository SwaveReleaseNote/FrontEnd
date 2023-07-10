import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ProjectList from '../components/project/projectList';

const Project: React.FC = () => {
  const navigate = useNavigate();

  function projectButtonClick(e: { preventDefault: () => void; }) {
    e.preventDefault();
    console.log('project create button clicked');
    navigate('/createProject');
}

  useEffect(() => {
    console.log('Project component rendered');
  }, []);

  return (
    <div className="fixed block bg-blue-100 top-[10%] w-screen h-[90%] items-center overflow-auto">
      <ProjectList />
      <div className="items-right absolute right-[1%] top-[2%]">
      <button onClick={projectButtonClick} type="button" className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">만들기</button>
      </div>
    </div>
  );
};

export default Project;
