import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import search from '../../assets/search-icon.png'

const GlobalSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      navigate('/searchResult',{
        state:{
          searchTerm: {searchTerm}
        }
      });
      setSearchTerm('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex overflow-hidden bg-gray-200 rounded-3xl absolute left-[30%] top-[15%] bottom-[15%] w-[40%] h-[70%]">
        <div className="flex w-1/6 absolute left-[5%] top-[30%] bottom-[20%]">
            <img src={search} alt="Image description" className="w-auto h-[90%]" />
        </div>
          <input 
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text" 
          placeholder='검색어를 입력해주세요' 
          className="absolute left-[15%] w-[80%] h-full text-base border-0 rounded-lg outline-none bg-gray-200 "/>
    </div>  
  );
};

export default GlobalSearch;


