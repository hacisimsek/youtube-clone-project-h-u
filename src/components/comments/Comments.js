import React, { useEffect, useState } from 'react';
import './Comments.css';
import Comment from '../comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsByVideoId } from '../../store/actions/commentsActions';
import numeral from 'numeral';

import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

const Comments = ({ videoId, commentCount }) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { darkMode } = useContext(ThemeContext);
  const { comments } = useSelector((state) => state.commentList);
  const { user } = useSelector((state) => state.auth);

  const commentsSnippets = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  // pulls comments by videos from store
  useEffect(() => {
    dispatch(getCommentsByVideoId(videoId));
  }, [dispatch, videoId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input.length === 0) return;
    setInput('');
  };

  return (
    <div className={darkMode ? ' comments ' : 'comments comments-dark'}>
      <p>{numeral(commentCount).format('0.a')} Comments</p>
      <div
        className={
          darkMode ? 'comments-form' : 'comments-form comments-form-dark'
        }
      >
        <img src={user?.photoURL} alt="userProfilePicture" />
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Add a public comment..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button>COMMENT</button>
        </form>
      </div>
      <div className={darkMode ? ' comments-list' : 'comments-list dark'}>
        {commentsSnippets?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};
export default Comments;
