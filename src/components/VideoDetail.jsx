import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import CommentSection from './CommentSection'; // Import the new CommentSection component

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items));

    fetchFromAPI(`commentThreads?part=snippet&videoId=${id}`)
      .then((data) => setComments(data.items));
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="90vh" display="flex" flexDirection={{ xs: "column", md: "row" }}>
      {/* Video Player and Details Section */}
      <Box flex={3} p={2}>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#ede7f6' }} mt={2}>
          {title}
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
          <Link to={`/channel/${channelId}`} style={{ textDecoration: "none" }}>
          <Typography variant="subtitle1" sx={{ color: '#ede7f6' }}>
  {channelTitle}
  <CheckCircleIcon fontSize="small" color="disabled" sx={{ ml: 1 }} />
</Typography>
          </Link>
          <Stack direction="row" gap={2} alignItems="center">
            <Typography variant="body1" color="textSecondary">
              {parseInt(viewCount).toLocaleString()} views
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {parseInt(likeCount).toLocaleString()} likes
            </Typography>
          </Stack>
        </Stack>
        <Box mt={2}>
          <CommentSection comments={comments} />
        </Box>
      </Box>

      {/* Suggested Videos Section */}
      <Box flex={1} height="85vh" p={2} sx={{overflowX:"scroll"}}>
      <Typography variant="body1" color="textSecondary">Suggested Videos
            </Typography>
        <Videos videos={videos} direction="column" />
      </Box>
    </Box>
  );
};

export default VideoDetail;
