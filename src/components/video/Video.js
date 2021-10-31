import React, { useEffect, useState } from 'react';
import './Video.css';
import { AiFillEye } from 'react-icons/ai';
import moment from 'moment';
import numeral from 'numeral';
import request from '../../api';
import { useHistory } from 'react-router';

import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

const Video = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      title,
      channelTitle,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

  const [views, setViews] = useState('');
  const [duration, setDuration] = useState('');
  const [channelIcon, setChannelIcon] = useState('');

  const seconds = moment.duration(duration).asSeconds();
  const videoDuration = moment.utc(seconds * 1000).format('mm:ss');

  const videoId = id?.videoId || id; 
  const history = useHistory();

  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    request('/videos', {
      params: {
        part: 'contentDetails,statistics',
        id: videoId,
      },
    })
      .then((data) => {
        setViews(data.data.items[0]?.statistics.viewCount); //it is unnecessary to get the items[0] element for all cases but necessary for the youtube api to work
        setDuration(data.data.items[0]?.contentDetails.duration);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [videoId]);

  useEffect(() => {
    request
      .get('/channels', {
        params: {
          part: 'snippet',
          id: channelId,
        },
      })
      .then((data) => {
        setChannelIcon(data.data.items[0].snippet.thumbnails.default);
      });
  }, [channelId]);

  const handleVideoClick = () => {
    history.push(`/watch/${videoId}`);
  };
  return (
    <div
      className={darkMode ? 'video' : 'video'}
      onClick={handleVideoClick}
    >
      <div className={darkMode ? 'video-top' : 'video-top'}>
        <img src={medium.url} alt="Video Preview" />
        <span>{videoDuration}</span>
      </div>
      <div
        className={darkMode ? 'video-description' : 'video-description video-description-dark'}
      >
        <img src={channelIcon?.url} alt="channel" />
        <div className={darkMode ? 'details' : 'details dark'}>
          <div className={darkMode ? 'details-title' : 'details-title details-title-dark'}>
            {title}
          </div>
          <div
            className={darkMode ? 'details-channel' : 'details-channel'}
          >
            <span>{channelTitle}</span>
          </div>
          <div className={darkMode ? 'details-stats' : 'details-stats'}>
            <span>
              <AiFillEye /> {numeral(views).format('0.a')} Views •
            </span>
            <span> {moment(publishedAt).fromNow()} </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Video;
