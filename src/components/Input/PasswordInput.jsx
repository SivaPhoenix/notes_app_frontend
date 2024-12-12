import React, { useState } from 'react'; // Import useState
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded-sm mb-3'>
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "password"}
        className='w-full text-sm bg-transparent py-3 rounded-sm focus:outline-none'
      />
      {isShowPassword ? (
        <FaRegEyeSlash
          size={22}
          className='text-primary cursor-pointer'
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEye
          size={22}
          className='text-primary cursor-pointer'
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
