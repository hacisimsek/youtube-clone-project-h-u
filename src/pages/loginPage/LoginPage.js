import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import './LoginPage.css';

import loginImage from '../../assets/images/youtube.svg';
import { login } from '../../store/actions/authActions';

import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';
import ThemeBotton from '../../components/ButtonTheme';

const LoginPage = () => {
  const dispatch = useDispatch();
  const loginClickHandler = () => {
    dispatch(login());
  };

  const accessToken = useSelector((state) => state.auth.accessToken);
  const history = useHistory();

  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (accessToken) {
      history.push('/');
    }
  }, [accessToken, history]);

  return (
    <div className={darkMode ? 'login' : 'login login-dark'}>
      <div
        className={
          darkMode ? 'login-content' : 'login-content login-content-dark'
        }
      >
        <div
          className={darkMode ? 'login-content-img' : 'login-content-img dark'}
        >
          <img
            src={loginImage}
            alt="youtube-ic"
            className="youtube-image"
          ></img>
        </div>
        <div>
          <button
            className={
              darkMode ? 'login-button' : 'login-button login-button-dark'
            }
            type="submit"
            onClick={loginClickHandler}
          >
            <span className={darkMode ? 'login-text' : 'login-text dark'}>
              Log in with Google
            </span>
          </button>
        </div>
        <ThemeBotton />
      </div>
    </div>
  );
};

export default LoginPage;
