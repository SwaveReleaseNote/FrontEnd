import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../utils/atoms.tsx';

const HelloUser: React.FC = () => {
  const [userName, setUserName] = useState('');
  const login = useRecoilValue(loginState);

  return (
    <div className="flex block break-words overflow-hidden absolute left-[80%] right-[5%] top-[33.68%] bottom-[34.74%] font-inter font-normal text-[2em] md:text-[1em] lg:text-[2em] xl:text-[1.2em] flex items-center justify-center text-black">
        <p className="flex block break-words overflow-hidden">
          <b>{login.name}</b>님 반갑습니다
        </p>
    </div>
  );
};

export default HelloUser;
