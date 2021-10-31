import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import VideoHorizontal from '../../components/videoHorizontal';
import { getSearchedVideos } from '../../store/actions/videoActions';

const SearchPage = () => {
  const { text } = useParams();
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.searchedVideos);

  useEffect(() => {
    dispatch(getSearchedVideos(text));
  }, [dispatch, text]);

  return (
    <Container>
      {!loading &&
        videos.map((video) => {
          return <VideoHorizontal video={video} key={video.id.videoId} />;
        })}
    </Container>
  );
};

export default SearchPage;
