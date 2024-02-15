import React, { useState } from "react";
import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";

import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";

function CommentCard({ comment }) {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [isEditing, setIsEditing] = useState(false);
  // const [content, setContent] = useState(comment.content);
  const dispatch = useDispatch();

  const handlePostMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePostMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (comment._id) {
      dispatch(deleteComment(comment._id));
    } else {
      console.error("Invalid comment ID");
    }
    handlePostMenuClose();
  };

  // const handleEdit = () => {
  //   setIsEditing(true);
  //   handlePostMenuClose();
  // };

  // const handleSave = () => {
  //   dispatch(editComment(comment._id, content));
  //   setIsEditing(false);
  // };

  // const handleChange = (event) => {
  //   setContent(event.target.value);
  // };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {comment.author?.name}
            </Typography>
            <IconButton onClick={handlePostMenuClick}>
              <MoreVertIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handlePostMenuClose}
            >
              <MenuItem onClick={handlePostMenuClose}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </Box>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
