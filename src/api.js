import axios from 'axios';

const request = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  params: {
    key: 'AIzaSyBvOnvM7MRcMV3EedmfD72sjSR9AYG-ZOs',
  },
});

export default request;
