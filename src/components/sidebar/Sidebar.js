import React from 'react';
import { useContext } from 'react';

import './Sidebar.css';
import {
  MdHome,
  MdSubscriptions,
  MdThumbUp,
  MdExplore,
  MdHistory,
  MdExitToApp,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { useHistory } from 'react-router';

import { ThemeContext } from '../../context/ThemeContext';
import ThemeBotton from '../ButtonTheme';

const Sidebar = ({ toggleSidebar }) => {
  const { darkMode } = useContext(ThemeContext);
  const history = useHistory();

  const component = (icon, title, clickHandler) => (
    <li onClick={clickHandler}>
      {icon}
      <span>{title}</span>
    </li>
  );

  const goesToHomePage = () => {
    history.push('/');
  };
  const goesToSubscriptions = () => {
    history.push('/feed/subscriptions');
  };

  const dispatch = useDispatch();
  //exit from website
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <nav
      className={
        darkMode
          ? toggleSidebar
            ? 'sidebar open'
            : 'sidebar'
          : toggleSidebar
          ? 'sidebar open sidebar-dark'
          : 'sidebar sidebar-dark'
      }
    >
      {component(<MdHome size={23} />, 'Home', goesToHomePage)}
      {component(
        <MdSubscriptions size={23} />,
        'Subscriptions',
        goesToSubscriptions
      )}

      <hr />
      {component(<MdThumbUp size={23} />, 'Liked')}
      {component(<MdExplore size={23} />, 'Explore')}
      {component(<MdHistory size={23} />, 'History')}
      <hr />
      {component(<MdExitToApp size={23} />, 'Log out', logoutHandler)}
      <hr />
      <ThemeBotton />
      <hr />
    </nav>
  );
};
export default Sidebar;
