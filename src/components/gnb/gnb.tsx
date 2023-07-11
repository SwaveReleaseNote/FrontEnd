import React from 'react';
import GlobalSearch from './globalSearch.tsx';
import HelloUser from './helloUser.tsx';
import Option from './option.tsx';
import PageName from './pageName.tsx'

const Gnb: React.FC = () => {
  return (
    <>
    <div className="fixed block bg-blue-300 top-0 w-screen h-[10%] flex items-center">
      <PageName />
      <GlobalSearch />
      <HelloUser />
      <Option />
    </div>
    
    </>
  );
};

export default Gnb;
