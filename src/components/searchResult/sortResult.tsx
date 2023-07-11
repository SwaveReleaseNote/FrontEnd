import React, { useEffect } from 'react';

const SortResult: React.FC = () => {
  useEffect(() => {
    console.log('Project component rendered');
  }, []);

  return (
    <div className="overflow-auto block bg-blue-200 w-[45%] h-[15%] items-center m-auto mt-[2em] mb-[2em] p-4">
        <div className='flex justify-center'>
        <label className="text-gray-900 dark">
        <input
            type="checkbox"
            // onChange={({ target: { checked } }) => onChange(checked)}
            className="focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 m-5 ml-0 mr-2 w-auto  h-auto"
        />
            전체
        </label>
        </div>        
    </div>
  );
};

export default SortResult;
