import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import CategoriesBar from '../../components/categoriesBar';
import Video from '../../components/video';
import { getPopularVideos } from '../../store/actions/videoActions';

const Homepage = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.homeVideos);

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  return (
    <Container>
      <CategoriesBar />
      <Row>
        {videos.map((video) => (
          <Col lg={3} md={4}>
            <Video video={video} key={video.id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Homepage;
