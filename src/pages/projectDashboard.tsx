import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PieChart from '../components/project/piechart.tsx';
import SearchRelaseNote from '../components/project/searchReleaseNote.tsx'
import MemberStatus from '../components/project/memberStatus.tsx';

const ProjectDashboard: React.FC = () => {
  const location = useLocation();
  const projectId = location.state.id;

  useEffect(() => {
    console.log('projectId:', projectId);
    axios.get(`/api/project/dashboard/${projectId}`)
        .then((response: { data: any }) => {
            const projectId = response.data.id;
            console.log(response.data);
        })
        .catch((error: any) => {
            console.error('Error fetching project dashboard:', error);
            console.log('Mocking data');
        });
  }, []);
 
  return (
    <div className='flex justify-center fixed top-[10%] w-screen h-[90%] overflow-auto'>
      <MemberStatus projectId={projectId}/>
      <div className='absolute top-[10%] right-[30%] bg-blue-100 h-[40%]'>
      <PieChart projectId={projectId} />
      </div>
      <SearchRelaseNote />
    </div>
  );
};

export default ProjectDashboard;
