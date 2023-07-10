import { useNavigate } from "react-router-dom";

import React from 'react';
import Logo from './logo.tsx'
import ProjectName from './projectName.tsx'


const Gnb: React.FC = () => {
    const navigate = useNavigate();

    function onClickTitle(e: { preventDefault: () => void; }) {
        e.preventDefault();
        console.log("todo: navigate to Project")
        navigate('/project');
    }
    return (
        <>
        <div>
        <button onClick={onClickTitle}>
        <Logo />  
        <ProjectName />
        </button>
        </div>
        
        </>
    );
};

export default Gnb;
