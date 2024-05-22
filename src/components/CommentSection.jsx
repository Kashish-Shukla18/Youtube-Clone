import React, { useState } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const CommentSection = ({ comments = [] }) => {
  const [showComments, setShowComments] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  const toggleExpandComment = (index) => {
    setExpandedComments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Box sx={{ width: '100%', padding: '0 20px', overflowX: 'hidden' }}>
      <Button onClick={toggleComments} sx={{ marginBottom: '10px', color: '#ab003c' }}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </Button>
      {showComments && (
        <Box>
          <Typography variant="h6" color="#fff" gutterBottom>
            Comments
            <hr/>
          </Typography>
          {comments.length > 0 ? (
            comments.map((comment, index) => {
              const isExpanded = expandedComments[index];
              const commentText = comment.snippet.topLevelComment.snippet.textOriginal;
              const shouldTruncate = commentText.length > 100;

              return (
                <Box key={index} sx={{ marginBottom: '20px' }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="subtitle2" color="#fff" sx={{ fontWeight: 'bold' }}>
                      {comment.snippet.topLevelComment.snippet.authorDisplayName}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, color: '#aaa' }}>
                      {formatDistanceToNow(new Date(comment.snippet.topLevelComment.snippet.updatedAt), { addSuffix: true })}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.9,
                      color: '#fff',
                      mt: 1,
                      overflow: 'hidden',
                      textOverflow: shouldTruncate && !isExpanded ? 'ellipsis' : 'unset',
                      display: '-webkit-box',
                      WebkitLineClamp: shouldTruncate && !isExpanded ? 3 : 'unset',
                      WebkitBoxOrient: 'vertical',
                      cursor: shouldTruncate ? 'pointer' : 'default',
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap'
                    }}
                    onClick={() => shouldTruncate && toggleExpandComment(index)}
                  >
                    {commentText}
                  </Typography>
                </Box>
              );
            })
          ) : (
            <Typography variant="body2" color="#fff">
              No comments available.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CommentSection;
