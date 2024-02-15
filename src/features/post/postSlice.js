import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { POSTS_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { getCurrentUserProfile } from "../user/userSlice";

const initialState = {
  isLoading: false,
  error: null,
  postsById: {},
  currentPagePosts: [],
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetPosts(state, action) {
      state.postsById = {};
      state.currentPagePosts = [];
    },

    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { posts, count } = action.payload;
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        if (!state.currentPagePosts.includes(post._id))
          state.currentPagePosts.push(post._id);
      });
      state.totalPosts = count;
    },

    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPost = action.payload;
      if (state.currentPagePosts.length % POSTS_PER_PAGE === 0)
        state.currentPagePosts.pop();
      state.postsById[newPost._id] = newPost;
      state.currentPagePosts.unshift(newPost._id);
    },

    sendPostReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, reactions } = action.payload;
      state.postsById[postId].reactions = reactions;
    },

    deletePostSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      const postId = action.payload;
      delete state.postsById[postId];
      state.currentPagePosts = state.currentPagePosts.filter(
        (id) => id !== postId
      );
      if (state.currentPagePosts.length % POSTS_PER_PAGE !== 0) {
        state.currentPagePosts.pop();
      }
    },
    deletePostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    editPostSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      const { id, updatedPost } = action.payload;
      state.postsById[id] = updatedPost;
    },

    editPostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

// Fetch Post
export const getPosts =
  ({ userId, page = 1, limit = POSTS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/user/${userId}`, {
        params,
      });
      if (page === 1) dispatch(slice.actions.resetPosts());
      dispatch(slice.actions.getPostsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createPost =
  ({ content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // upload image to cloudinary
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.post("/posts", {
        content,
        image: imageUrl,
      });
      dispatch(slice.actions.createPostSuccess(response.data));
      toast.success("Post successfully");
      dispatch(getCurrentUserProfile());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deletePost = (postId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.delete(`/posts/${postId}`);
    dispatch(slice.actions.deletePostSuccess(postId));
    toast.success("Post deleted successfully");
  } catch (error) {
    dispatch(slice.actions.deletePostFailure(error.message));
    toast.error(error.message);
  }
};

// Async action
export const editPost = (id, content) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/posts/${id}`, { content });
    if (response.data) {
      dispatch(
        slice.actions.editPostSuccess({ id, updatedPost: response.data })
      );
      toast.success("Post updated successfully");
    } else {
      throw new Error("Failed to update post");
    }
  } catch (error) {
    dispatch(slice.actions.editPostFailure(error.message));
    toast.error(error.message);
  }
};

export const sendPostReaction =
  ({ postId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Post",
        targetId: postId,
        emoji,
      });
      dispatch(
        slice.actions.sendPostReactionSuccess({
          postId,
          reactions: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
