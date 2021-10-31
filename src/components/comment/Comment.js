import React from 'react';
import './Comment.css';
import moment from 'moment';

import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

const Comment = ({
  comment: {
    textOriginal,
    authorDisplayName,
    authorProfileImageUrl,
    publishedAt,
  },
}) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={darkMode ? 'comment' : 'comment comment-dark'}>
      <img src={authorProfileImageUrl} alt="userProfilePicture" />
      <div className={darkMode ? 'comment-area ' : 'comment-area dark'}>
        <span className={darkMode ? 'comment-header' : 'comment-header comment-header-dark'}>
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </span>
        <span className={darkMode ? 'user-comment' : 'user-comment dark'}>
          {textOriginal}
        </span>
      </div>
    </div>
  );
};
export default Comment;
