import React from 'react';
import { MdOutlineAddCircleOutline } from 'react-icons/md'; // Optional icon

const EmptyCard = ({ imgSrc,message }) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
    <img src={imgSrc} alt="No Notes" className='w-60'/>
    <p className='w-1/2 test-sm font-medium text-slate-700 text-center leading-7 mt-5'>{message}</p>
    </div>
    
    
  );
};

export default EmptyCard;
