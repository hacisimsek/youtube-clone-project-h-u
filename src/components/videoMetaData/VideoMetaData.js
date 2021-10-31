import moment from 'moment';
import numeral from 'numeral';
import React, { useEffect } from 'react';
import './VideoMetaData.css';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import ReactShowMoreText from 'react-show-more-text';
import { useDispatch } from 'react-redux';
import { getChannelDetails } from '../../store/actions/channelActions';
import { useSelector } from 'react-redux';

import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

const VideoMetaData = ({ video: { snippet, statistics }, id }) => {
  const { publishedAt, channelId, title, description, channelTitle } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;

  const dispatch = useDispatch();

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);

  const { subscriptionStatus } = useSelector((state) => state.channelDetails);

  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  return (
    <div
      className={
        darkMode ? 'videoMetaData' : 'videoMetaData videoMetaData-dark'
      }
    >
      <div
        className={
          darkMode
            ? 'videoMetaData-top'
            : 'videoMetaData-top videoMetaData-top-dark'
        }
      >
        <h5>{title}</h5>
        <div
          className={
            darkMode
              ? 'videoMetaData-top-stats'
              : 'videoMetaData-top-stats dark'
          }
        >
          <span>
            {numeral(viewCount).format('0.a')} Views •{' '}
            {moment(publishedAt).fromNow()}{' '}
          </span>
          <div
            className={
              darkMode
                ? 'videoMetaData-top-stats-icons'
                : 'videoMetaData-top-stats-icons dark'
            }
          >
            <span>
              <MdThumbUp size={26} /> {numeral(likeCount).format('0.a')}
            </span>
            <span>
              <MdThumbDown size={26} /> {numeral(dislikeCount).format('0.a')}
            </span>
          </div>
        </div>
      </div>
      <div
        className={
          darkMode
            ? 'videoMetaData-channel'
            : 'videoMetaData-channel videoMetaData-channel-dark'
        }
      >
        <div
          className={
            darkMode
              ? 'videoMetaData-channel-details'
              : 'videoMetaData-channel-details dark'
          }
        >
          <img
            src={channelSnippet?.thumbnails.default.url}
            alt="channel icon"
          />
          <div>
            <span
              className={
                darkMode
                  ? 'videoMetaData-channel-details-title'
                  : 'videoMetaData-channel-details-title videoMetaData-channel-details-title-dark'
              }
            >
              {channelTitle}
            </span>
            <span>
              {numeral(channelStatistics?.subscriberCount).format('0.a')}{' '}
              Subscribers
            </span>
          </div>
        </div>
        <button
          className={
            darkMode
              ? subscriptionStatus
                ? 'videoMetaData-channel-subscribed'
                : 'videoMetaData-channel-notSubscribed'
              : subscriptionStatus
              ? 'videoMetaData-channel-subscribed dark'
              : 'videoMetaData-channel-notSubscribed dark'
          }
        >
          {subscriptionStatus ? 'SUBSCRIBED' : 'SUBSCRIBE'}
        </button>
      </div>
      <div
        className={
          darkMode
            ? 'videoMetaData-description'
            : 'videoMetaData-description videoMetaData-description-dark'
        }
      >
        <ReactShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ReactShowMoreText>
      </div>
    </div>
  );
};
export default VideoMetaData;
