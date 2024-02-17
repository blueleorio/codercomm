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
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";

import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "./commentSlice";
import ConfirmationDialog from "../../components/ConfirmationDialog";

function CommentCard({ comment }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentOperation, setCurrentOperation] = useState(null);
  const dispatch = useDispatch();

  const handlePostMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePostMenuClose = () => {
    setAnchorEl(null);
  };

  // const handleDelete = () => {
  //   if (comment._id) {
  //     dispatch(deleteComment(comment._id));
  //   } else {
  //     console.error("Invalid comment ID");
  //   }
  //   handlePostMenuClose();
  // };

  const handleDeleteDialogOpen = () => {
    setCurrentOperation("DELETE");
    setDialogOpen(true);
    handlePostMenuClose();
  };

  const handleSaveDialogOpen = () => {
    setCurrentOperation("SAVE");
    setDialogOpen(true);
    handlePostMenuClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    if (currentOperation === "DELETE") {
      if (comment._id) {
        dispatch(deleteComment(comment._id));
      } else {
        console.error("Invalid comment ID");
      }
    } else if (currentOperation === "SAVE") {
      dispatch(editComment(comment._id, content));
      setIsEditing(false);
    }
    handleDialogClose();
  };

  const handleEdit = () => {
    setIsEditing(true);
    handlePostMenuClose();
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

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
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteDialogOpen}>Delete</MenuItem>
            </Menu>
          </Box>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>

        {isEditing ? (
          <>
            <TextField value={content} onChange={handleChange} />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveDialogOpen}
            >
              Save
            </Button>
          </>
        ) : (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {comment.content}
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
      <ConfirmationDialog
        open={isDialogOpen}
        handleClose={handleDialogClose}
        onConfirm={handleConfirm}
        confirmMessage={`Please type ${currentOperation} to confirm`}
        confirmKeyword={currentOperation}
      />
    </Stack>
  );
}

export default CommentCard;
