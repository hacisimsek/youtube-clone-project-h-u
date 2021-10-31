import './Header.css';
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdApps, MdNotifications } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import headerLogo from '../../assets/images/youtube.svg';
import headerLogoMobile from '../../assets/images/header-youtube-logo.png';

import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

const Header = ({ handleToggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState('');
  const history = useHistory();

  const { darkMode } = useContext(ThemeContext);

  //Searches by text
  const searchHandler = (e) => {
    e.preventDefault();
    history.push(`/search/${text}`);
  };

  const goesToHomePage = () => {
    history.push('/');
  };

  return (
    <div className={darkMode ? 'header' : 'header header-dark'}>
      <FaBars
        className={darkMode ? 'header-menu' : 'header-menu dark'}
        size={26}
        onClick={handleToggleSidebar}
      />
      <img
        src={headerLogo}
        alt="logo"
        onClick={goesToHomePage}
        className={darkMode ? 'header-logo' : 'header-logo header-logo-dark'}
      />
      <img
        src={headerLogoMobile}
        onClick={goesToHomePage}
        alt="logo"
        className={darkMode ? 'header-logo-mobile' : 'header-logo-mobile dark'}
      />
      <form onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="Search"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>
          {/* kanka bu iconu dark mode yapmazsan bana yaz */}
          <AiOutlineSearch size={22} color="white" />
        </button>
      </form>
      <div className={darkMode ? 'header-icons' : 'header-icons dark'}>
        <MdApps size={28} className="youtube-apps" />
        <MdNotifications size={28} className="youtube-notification" />
        <img src={user?.photoURL} alt="userProfilePicture" />
      </div>
    </div>
  );
};
export default Header;
