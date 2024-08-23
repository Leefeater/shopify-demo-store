import React from 'react';
import './button.css'



const CustomButton = ({ onClick, children, disabled }) => {
  return <button className="custom-button" onClick={onClick} disabled={disabled}>{children}</button>;
};

export default CustomButton;
