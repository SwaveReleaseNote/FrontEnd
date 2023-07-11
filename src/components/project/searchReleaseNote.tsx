import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loginState } from '../../utils/atoms.tsx';
import { useRecoilValue } from 'recoil';
import { useNavigate } from "react-router-dom";
import GlobalSearch from '../gnb/globalSearch.tsx';
import search from '../../assets/search-icon.png'

const SearchReleaseNote: React.FC = () => {

  return (
    <div className='absolute top-[10%] right-[8%] flex justify-center ml-10 bg-blue-100 h-[80%] w-[21%]'>
      <div className='text-sm flex overflow-hidden bg-blue-200 rounded-2xl absolute left-[5%] top-[3%] bottom-[15%] w-[15%] h-[5%]'>
        <button className='absolute left-[15%] top-[10%]'>
          기준
        </button>
      </div>
      <div className="flex overflow-hidden bg-blue-200 rounded-3xl absolute left-[22%] top-[3%] bottom-[15%] w-[70%] h-[5%]">
        <div className="flex w-[10%] absolute left-[5%] top-[30%] bottom-[20%]">
            <img src={search} alt="Image description" className="w-auto" />
        </div>
          <input
          type="text" 
          placeholder='검색어를 입력해주세요' 
          className="text-sm absolute left-[15%] w-[80%] h-full text-base border-0 rounded-lg outline-none bg-blue-200"/>
      </div>
      <div className='flex overflow-hidden bg-blue-200 absolute left-[5%] top-[10%] bottom-[15%] w-[90%] h-[88%]'>
        
      </div>
    </div>
  );
};

export default SearchReleaseNote;
