import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginState } from '../utils/atoms.tsx';
import { useRecoilValue } from 'recoil';

type TeamMember = {
  id: number;
  name: string;
  department: string;
};

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const login = useRecoilValue(loginState);
  const managerId = login.id;

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [suggestedMembers, setSuggestedMembers] = useState<TeamMember[]>([]);
  const [projectName, setProjectName] = useState('');
  const [projectOverview, setProjectOverview] = useState('');

  // fetch All Members
  const fetchMembers = async () => {
    try {
      const response = await axios.get('localhost:8080/api/members');
      const members: TeamMember[] = response.data.map((member: any) => ({
        id: member.user_id,
        name: member.user_name,
        department: member.user_department,
      }));

      setAllMembers(members);
    } catch (error) {
      console.error('Error fetching members:', error);
      console.log('Mocking');
      mockFetchSuggestions();
    }
  };

  const handleAddMember = (member: TeamMember) => {
    // Check if member already exists in teamMembers
    const isMemberAlreadyAdded = teamMembers.some((teamMember) => teamMember.id === member.id);
  
    if (isMemberAlreadyAdded) {
      alert('이미 있는 멤버입니다.'); // Display a message or handle as per your requirement
    } else {
      const updatedMember: TeamMember = {
        ...member,
        department: member.department,
      };
  
      setTeamMembers([...teamMembers, updatedMember]);
      setNewMemberName('');
      setSuggestedMembers([]);
    }
  };

  const handleRemoveMember = (id: number) => {
    const updatedMembers = teamMembers.filter((member) => member.id !== id);
    setTeamMembers(updatedMembers);
    console.log('Present Team Member:', teamMembers);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value;
    setNewMemberName(inputName);

    if (inputName.trim() !== '') {
      const filteredMembers = allMembers.filter((member) =>
        member.name.toLowerCase().includes(inputName.toLowerCase())
      );

      setSuggestedMembers(filteredMembers);
    } else {
      setSuggestedMembers([]);
    }
  };

  const mockFetchSuggestions = () => {
    // Simulate API response with mock data
    const mockResponse: TeamMember[] = [
      { id: 1, name: '김기현', department: '부서1' },
      { id: 2, name: '김성국', department: '부서2' },
      { id: 3, name: '함건욱', department: '부서3' },
      { id: 4, name: '강준희', department: '부서4' },
      { id: 5, name: '이승섭', department: '부서5' },
      { id: 6, name: '전강훈', department: '부서6' },
    ];
    setAllMembers(mockResponse);
  };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const idList: number[] = teamMembers.map((member) => member.id);
      const projectData = {
        projectName,
        projectOverview,
        managerId,
        idList,
      };

      console.log(projectData);

      // Send projectData to the backend using axios
      await axios.post('localhost:8080/api/createProject', projectData);

      // Clear the form fields and team member list
      setProjectName('');
      setProjectOverview('');
      setTeamMembers([]);
      navigate('/project');
    } catch (error) {
      console.error('Error submitting project:', error);
      navigate('/project');
    }
  };

  // Frist Rendering
  useEffect(() => {
    console.log('Project Create Page rendered');
    fetchMembers();
  }, []);

  return (
    <div className="flex justify-center fixed top-[10%] w-screen h-[90%] overflow-auto">
      <div className="m-auto fixed top-[10%] bg-blue-100 w-[80%] h-[90%] items-center overflow-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="projectName" className="block mt-10 ml-10 text-xl font-medium text-gray-900">
              프로젝트 이름
            </label>
            <input
              type="text"
              id="projectName"
              className="m-5 ml-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5"
              placeholder="프로젝트 이름을 입력해주세요"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="projectOverview" className="block mt-10 ml-10 text-xl font-medium text-gray-900">
              프로젝트 개요
            </label>
            <input
              type="text"
              id="projectOverview"
              className="m-5 ml-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5"
              placeholder="프로젝트 개요을 입력해주세요"
              value={projectOverview}
              onChange={(e) => setProjectOverview(e.target.value)}
              required
            />
          </div>

          <div className="flex m-5 ml-10 mt-10">
            <div>
              <h3 className="text-xl font-medium mb-4">프로젝트 팀원</h3>
              <div className="flex mb-4">
                <input
                  type="text"
                  className="w-64 p-2 border border-gray-300 rounded"
                  placeholder="팀원 이름을 입력해주세요"
                  value={newMemberName}
                  onChange={handleInputChange}
                />
                {/* <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-r"
                  onClick={() => handleAddMember({ id: Date.now(), name: newMemberName, department: '' })}
                >
                  추가
                </button> */}
              </div>
              {teamMembers.length > 0 ? (
                <ul className="list-disc list-inside">
                  {teamMembers.map((member) => (
                    <li key={member.id} className="mb-2">
                      {member.name} {member.department}
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        제거
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>팀원이 추가되지 않았습니다.</p>
              )}
            </div>

            <div className="ml-8">
              <h3 className="text-xl font-medium mb-4">추천하는 팀원</h3>
              {suggestedMembers.length > 0 ? (
                <ul>
                  {suggestedMembers.map((member) => (
                    <li key={member.id} className="mb-2">
                      {member.name} {member.department}
                      <button
                        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleAddMember(member)}
                      >
                        추가
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>추천하는 팀원이 없습니다.</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="flex m-5 ml-80 mt-10 bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            프로젝트 생성
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;