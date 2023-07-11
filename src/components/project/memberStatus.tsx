import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css.css';

type Props = {
  projectId: {
    id:number;
  };
};

type MemberStatus = {
    memberName:string;
    status:boolean;
};

const MemberStatus: React.FC<Props> = ({projectId}) => {
    const [memberStatus, setMemberStatus] = useState<MemberStatus[]>([]);

    useEffect(() => {
        console.log("Mebers Status Project id:", projectId.id);
        const fetchData = async () => {
            try {
            const response = await axios.get(`/api/project/dashboard/meberStatus/${projectId.id}`);

            const data: MemberStatus[] = response.data;
            setMemberStatus(data);
            } catch (error) {
            console.error('Error fetching project Member Status:', error);
            console.log('Mocking data');

            const mockResponse: MemberStatus[] = [
                { memberName: '함건욱', status: true },
                { memberName: '김기현', status: false },
                { memberName: '김성국', status: false },
                { memberName: '강준희', status: true },
                { memberName: '전강훈', status: true },
                { memberName: '이승섭', status: true },
            ];
            
            setMemberStatus(mockResponse);
            }
        };

        fetchData();
        }, [projectId]);
    
    return (
        <div className='absolute top-[10%] left-[27%] flex flex-col items-center justify-center bg-blue-100 h-[40%] w-[21%]'>
            <p className='mt-4 mb-2 text-xl font-bold'>Member Status:</p>
            <ul className="w-full overflow-auto scrollbar-thumb-red-500 scrollbar-track-blue-200">
            {memberStatus.map((member) => (
                <li key={member.memberName} className='ml-3 p-2 flex items-center'>
                    <span>
                    {member.memberName} - 상태: {member.status ? '온라인' : '오프라인'}
                    </span>
                    <div className={`flex-shrink-0 w-4 h-4 rounded-full ml-auto ${member.status ? 'bg-green-400' : 'bg-red-400'}`}></div>
                </li>
                ))}
            </ul>
        </div>

    );
};
  
export default MemberStatus;