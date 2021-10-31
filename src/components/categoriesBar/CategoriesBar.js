import React, { useState } from 'react';
import './CategoriesBar.css';
import { useDispatch } from 'react-redux';
import { getVideosByCategory } from '../../store/actions/videoActions';

import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const keywords = [
  'All',
  'Kodluyoruz',
  'Music',
  'Boiler Room',
  'Movie',
  'Crypto',
  'Football',
  'Marty Shwartz',
  'Hip Hop',
  'Workout',
  'Guitar',
  'Podcast',
  'React JS',
  'Psychology',
];

const CategoriesBar = () => {
  const [active, setActive] = useState('All');
  const dispatch = useDispatch();

  const { darkMode } = useContext(ThemeContext);

  // Brings videos of the selected category element
  const handleCategoryClick = (value) => {
    setActive(value);
    dispatch(getVideosByCategory(value));
  };
  return (
    <>
      <div className={darkMode ? 'categories-bar' : 'categories-bar categories-bar-dark'}>
        {keywords.map((value, i) => (
          <span
            key={i}
            onClick={() => handleCategoryClick(value)}
            className={
              darkMode
                ? active === value
                  ? 'active'
                  : ''
                : active === value
                ? 'active dark-span'
                : 'dark-span'
            }
          >
            {value}
          </span>
        ))}
      </div>
    </>
  );
};
export default CategoriesBar;
