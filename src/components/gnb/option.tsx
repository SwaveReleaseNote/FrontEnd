import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const Option: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        dropdownRef2.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !dropdownRef2.current.contains(event.target as Node)
      ) {
        handleClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleClickOutside = () => {
    setIsMenuOpen(false);
    console.log('handleClickOutside');
  };

  const handleIconClick = () => {
    console.log('handleIconClick');
    setIsMenuOpen(!isMenuOpen);
  };

  const onClickMypage = () => {
    console.log('MyPage button clicked');
    setIsMenuOpen(false);
    navigate('/MyPage');
  };

  const onClickLogout = () => {
    console.log('Logout button clicked');
    setIsMenuOpen(false);
    navigate('/LogOut');
  };

  // useEffect(() => {
  //   console.log('isMenuOpen:', isMenuOpen);
  // }, [isMenuOpen]);

  return (
    <>
      <div ref={dropdownRef} className="flex option absolute left-[95%] items-center justify-center rounded-full">
        <button onClick={handleIconClick} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-400 hover:bg-blue-500 focus:ring-blue-600">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div
          ref={dropdownRef2}
          className="absolute right-[4%] top-[90%] w-[6%]"
        >
          <div className="relative">
            <div className="p-1 bg-blue-200 rounded-2xl text-center border-solid border-2 border-blue-400">
              <ul>
                <button className="p-1 justify-center text-blue-900 rounded hover:bg-blue-300" onClick={onClickMypage}>MyPage</button>
                <button className="p-1 justify-center text-blue-900 rounded hover:bg-blue-300" onClick={onClickLogout}>LogOut</button>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Option;