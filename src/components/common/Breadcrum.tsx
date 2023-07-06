import React from 'react';
import '../../styles/Breadcrum.css'
 
type StringData = {
  data: string;
};

const Breadcrum: React.FC<StringData> = ({ data }) => {

  const strings = data.split('/');

   
   return (
      <div className='container'>
        {strings.map((str, index) => {
  const path = strings.slice(0, index + 1).join('/');
  const href = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=/${path}`;

return(

  <div className='container'> 
<a className='content' href={href}>{str}</a> 
{ index < strings.length -1 && <p className='contentDivider'> ></p>  }
  

  </div>


);
        })}
      </div>
    );
  };
  

export default Breadcrum;
