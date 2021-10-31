import React, { useEffect, useState } from 'react';
import './VideoHorizontal.css';
import moment from 'moment';
import numeral from 'numeral';
import { useHistory } from 'react-router';
import request from '../../api';

import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

const VideoHorizontal = ({ video, channelVideos }) => {
  const {
    id,
    snippet: {
      publishedAt,
      title,
      thumbnails: { medium },
      channelTitle,
      resourceId,
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const history = useHistory();
  const seconds = moment.duration(duration).asSeconds();
  const videoDuration = moment.utc(seconds * 1000).format('mm:ss');
  const videoId = channelVideos ? resourceId?.videoId : id.videoId;
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    request('/videos', {
      params: {
        part: 'contentDetails,statistics',
        id: videoId,
      },
    })
      .then((data) => {
        setViews(data.data.items[0].statistics.viewCount);
        setDuration(data.data.items[0].contentDetails.duration);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [videoId]);

  const handleVideoClick = () => {
    history.push(`/watch/${videoId}`);
  };
  return (
    <div
      className={
        darkMode ? 'videoHorizontal' : 'videoHorizontal videoHorizontal-dark'
      }
      onClick={handleVideoClick}
    >
      <div
        className={
          darkMode ? 'videoHorizontal-left' : 'videoHorizontal-left dark'
        }
      >
        <img src={medium.url} alt="video" />
        {videoDuration && <span>{videoDuration}</span>}
      </div>
      <div
        className={
          darkMode ? 'videoHorizontal-right' : 'videoHorizontal-right dark'
        }
      >
        <div
          className={
            darkMode
              ? 'videoHorizontal-title'
              : 'videoHorizontal-title videoHorizontal-title-dark'
          }
        >
          {title}
        </div>
        <div
          className={
            darkMode
              ? 'videoHorizontal-details'
              : 'videoHorizontal-details dark'
          }
        >
          <span>{channelTitle}</span>
          <span>
            {numeral(views).format('0.a')} Views •{' '}
            {moment(publishedAt).fromNow()}{' '}
          </span>
        </div>
      </div>
    </div>
  );
};
export default VideoHorizontal;
