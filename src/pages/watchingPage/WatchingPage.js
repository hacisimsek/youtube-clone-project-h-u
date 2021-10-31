import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import VideoHorizontal from '../../components/videoHorizontal';
import VideoMetaData from '../../components/videoMetaData';
import Comments from '../../components/comments';
import {
  getRelatedVideos,
  getVideoById,
} from '../../store/actions/videoActions';
import './WatchingPage.css';

import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

const WatchingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { video, loading } = useSelector((state) => state.selectedVideo);
  const { videos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );

  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  return (
    <Row>
      <Col lg={8}>
        <div
          className={darkMode ? 'watch-page-player' : 'watch-page-player dark'}
        >
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet.title}
            allowFullScreen
            height="100%"
            width="100%"
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} id={id} />
        ) : (
          <div>Loading...</div>
        )}
        <Comments videoId={id} commentCount={video?.statistics.commentCount} />
      </Col>
      <Col lg={4}>
        {!relatedVideosLoading &&
          videos
            ?.filter((video) => video.snippet)
            .map((video) => (
              <VideoHorizontal video={video} key={video.id.videoId} />
            ))}
      </Col>
    </Row>
  );
};

export default WatchingPage;
