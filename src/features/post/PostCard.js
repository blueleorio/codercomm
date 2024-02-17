import React, { useState } from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";

import { useDispatch } from "react-redux";
import { deletePost, editPost } from "./postSlice";
import ConfirmationDialog from "../../components/ConfirmationDialog";

function PostCard({ post }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post.content);
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
  //   dispatch(deletePost(post._id));
  //   handlePostMenuClose();
  // };

  const handleEdit = () => {
    setIsEditing(true);
    handlePostMenuClose();
  };

  const handleSave = () => {
    dispatch(editPost(post._id, content));
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleDeleteDialogOpen = () => {
    setDialogOpen(true);
    handlePostMenuClose();
  };

  const handleDeleteDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    dispatch(deletePost(post._id));
    handleDeleteDialogClose();
  };
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <div>
            <IconButton onClick={handlePostMenuClick}>
              <MoreVertIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handlePostMenuClose}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteDialogOpen}>Delete</MenuItem>
            </Menu>
            <ConfirmationDialog
              open={isDialogOpen}
              handleClose={handleDeleteDialogClose}
              onDelete={handleDeleteConfirm}
              confirmMessage="Please type DELETE to confirm deletion"
              confirmKeyword="DELETE"
            />
          </div>
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        {isEditing ? (
          <>
            <TextField value={content} onChange={handleChange} />
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <Typography>{post.content}</Typography>
        )}

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
