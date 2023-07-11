import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loginState } from '../../utils/atoms.tsx';
import { useRecoilValue } from 'recoil';
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  role: string;
  name: string;
  description: string;
  createDate: string;
}

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [managerDeveloperProjectList, setManagerDeveloperProjectList] = useState<Project[]>([]);
  const [subscriberProjectList, setSubscriberProjectList] = useState<Project[]>([]);
  const login = useRecoilValue(loginState);
  
  const displayedManageDevelopList = managerDeveloperProjectList.slice(offset, offset + limit);
  const displayedSubscribeList = subscriberProjectList.slice(offset, offset + limit);

  const handleButtonClick = () => {
    console.log('Button Cliked');
    setIsSubscribeOpen(!isSubscribeOpen);
  };

  useEffect(() => {
    const userId = login.id; // Replace with the actual user ID
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/project/load/all/${userId}`);
        const fetchedProjectList = response.data;

        const managerDeveloperProjects = fetchedProjectList.filter(
          (project: { role: string; }) => project.role === 'Manager' || project.role === 'Developer'
        );

        const subscriberProjects = fetchedProjectList.filter(
          (project: { role: string; }) => project.role === 'Subscriber'
        );

        setProjectList(fetchedProjectList);
        setManagerDeveloperProjectList(managerDeveloperProjects);
        setSubscriberProjectList(subscriberProjects);
      } catch (error) {
        console.error('Error fetching project List:', error);
        console.log('Mocking data');
        mockFetchProjectList();
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (page < 1) {
        const lastPage = Math.ceil((managerDeveloperProjectList.length + subscriberProjectList.length) / limit);
        setPage(lastPage || 1);
      } else if (displayedManageDevelopList.length === 0 && displayedSubscribeList.length === 0) {
        setPage(1);
      }
      console.log('page:', page);
    }
  }, [page, displayedManageDevelopList, displayedSubscribeList, isLoading]);


  const mockFetchProjectList = () => {
    // Simulate API response with mock data
    const fetchedProjectList = ([
      {
        id: 1,
        role: 'Manager',
        name: 'hi',
        description: '안농11',
        createDate: '2023-07-07T00:00:00.000+00:00',
      },
      {
        id: 2,
        role: 'Manager',
        name: 'bye',
        description: '안농11',
        createDate: '2023-07-07T00:00:00.000+00:00',
      },
      {
        id: 3,
        role: 'Subscriber',
        name: 'hiagain',
        description: '안농23',
        createDate: '2023-07-10T00:00:00.000+00:00',
      },
      {
        id: 4,
        role: 'Developer',
        name: 'hiagain',
        description: '안농23',
        createDate: '2023-07-10T00:00:00.000+00:00',
      },
      {
        id: 5,
        role: 'Subscriber',
        name: 'hi',
        description: '안농23',
        createDate: '2023-07-10T00:00:00.000+00:00',
      },
      {
        id: 6,
        role: 'Developer',
        name: 'hi',
        description: '안농23',
        createDate: '2023-07-10T00:00:00.000+00:00',
      },
    ]);

    const managerDeveloperProjects = fetchedProjectList.filter(
      (project: { role: string; }) => project.role === 'Manager' || project.role === 'Developer'
    );

    const subscriberProjects = fetchedProjectList.filter(
      (project: { role: string; }) => project.role === 'Subscriber'
    );

    setProjectList(fetchedProjectList);
    setManagerDeveloperProjectList(managerDeveloperProjects);
    setSubscriberProjectList(subscriberProjects);
  };

  function clickProjectName(id: number, event: React.MouseEvent<HTMLButtonElement>) {
    navigate('/project/dashboard', {
      state: {
        id: { id }
      }
    });
  }

  return (
    <div className='flex justify-center '>
      <button onClick={handleButtonClick} className={`fixed block ${isSubscribeOpen ? 'bg-blue-400' : 'bg-blue-200'} top-[15%] left-[1.5%] w-[10%] h-[5%] items-center overflow-auto`}>
        Developer
      </button>
      <button onClick={handleButtonClick} className={`fixed block ${isSubscribeOpen ? 'bg-blue-200' : 'bg-blue-400'} top-[15%] left-[12%] w-[10%] h-[5%] items-center overflow-auto`}>
        Subsribe
      </button>
      <div className="fixed block bg-blue-200 top-[20%] w-[97%] h-[40%] items-center overflow-auto">
        <button onClick={() => setPage(page + 1)} type="button" className="fixed block bg-blue-200 right-[5%] top-[35%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
          <span className="sr-only">Icon description</span>
        </button>
        <button onClick={() => setPage(page - 1)} type="button" className="fixed block bg-blue-200 left-[5%] top-[35%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-4 h-4 transform rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
          <span className="sr-only">Icon description</span>
        </button>

        {isSubscribeOpen ? (
          <div className="w-auto absolute right-[30%] top-[5%]">
            <div>
              <h1>Subscribe List</h1>
              <ul>
                {subscriberProjectList.map((project) => (
                  <li key={project.id}>
                    <p>ID: {project.id}</p>
                    <p>Role: {project.role}</p>
                    <button onClick={(event) => clickProjectName(project.id, event)}>
                      Name: {project.name}
                    </button>
                    <p>Description: {project.description}</p>
                    <p>Create Date: {project.createDate}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="w-auto absolute right-[30%] top-[5%]">
            <div>
              <h1>Project List</h1>
              {displayedManageDevelopList.length > 0 ? (
              <ul>
                {displayedManageDevelopList.map((project) => (
                  <li key={project.id}>
                    <p>ID: {project.id}</p>
                    <p>Role: {project.role}</p>
                    <button onClick={(event) => clickProjectName(project.id, event)}>
                      Name: {project.name}
                    </button>
                    <p>Description: {project.description}</p>
                    <p>Create Date: {project.createDate}</p>
                  </li>
                ))}
              </ul>
              ) : (
                <p>No projects to display.</p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="fixed block bg-blue-200 top-[62%] w-[97%] h-[40%] items-center overflow-auto">
        <p className='p-5'>Added support for new Wasm runtimes: slight, spin, and wasmtime. Users can download Wasm runtimes on demand when the containerd image store is enabled.
Added Rust server support to Docker init.
Beta release of the Builds view that lets you inspect builds and manage builders. This can be found in the Features in Development tab in Settings.Added support for new Wasm runtimes: slight, spin, and wasmtime. Users can download Wasm runtimes on demand when the containerd image store is enabled.
Added Rust server support to Docker init.
Beta release of the Builds view that lets you inspect builds and manage builders. This can be found in the Features in Development tab in Settings.Added support for new Wasm runtimes: slight, spin, and wasmtime. Users can download Wasm runtimes on demand when the containerd image store is enabled.
Added Rust server support to Docker init.
Beta release of the Builds view that lets you inspect builds and manage builders. This can be found in the Features in Development tab in Settings.Added support for new Wasm runtimes: slight, spin, and wasmtime. Users can download Wasm runtimes on demand when the containerd image store is enabled.
Added Rust server support to Docker init.
Beta release of the Builds view that lets you inspect builds and manage builders. This can be found in the Features in Development tab in Settings.Added support for new Wasm runtimes: slight, spin, and wasmtime. Users can download Wasm runtimes on demand when the containerd image store is enabled.
Added Rust server support to Docker init.
Beta release of the Builds view that lets you inspect builds and manage builders. This can be found in the Features in Development tab in Settings.Added support for new Wasm runtimes: slight, spin, and wasmtime. Users can download Wasm runtimes on demand when the containerd image store is enabled.
Added Rust server support to Docker init.
Beta release of the Builds view that lets you inspect builds and manage builders. This can be found in the Features in Development tab in Settings.Added support for new Wasm runtimes: slight, spin, and wasmtime. Users can download Wasm runtimes on demand when the containerd image store is enabled.
Added Rust server support to Docker init.
Beta release of the Builds view that lets you inspect builds and manage builders. This can be found in the Features in Development tab in Settings.</p>
      </div>
    </div>
  );
};

export default ProjectList;
