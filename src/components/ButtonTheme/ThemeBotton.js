import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

import './ThemeBotton.css';
import { MdDarkMode } from 'react-icons/md';

const component = (icon, title, clickHandler) => (
  <li onClick={clickHandler}>
    {icon}
    <span>{title}</span>
  </li>
);

function ThemeBotton() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const handleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <button
      className={darkMode ? 'button-theme' : 'button-theme button-theme-dark button-login-dark'}
      onClick={handleTheme}
    >
      {component(<MdDarkMode size={23} />, 'Dark Mode')}
    </button>
  );
}

export default ThemeBotton;
