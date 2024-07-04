// Input.js
import React from 'react';

const Input = ({ type, placeholder, value, onChange, className, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      {...props}
    />
  );
};

export default Input;