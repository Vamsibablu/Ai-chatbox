export const ADD_MESSAGE = "ADD_MESSAGE";
export const SHOW_RATING = "SHOW_RATING";
export const SET_RATING = "SET_RATING";
export const SHOW_FEEDBACK = "SHOW_FEEDBACK";
export const SET_FEEDBACK = "SET_FEEDBACK";
export const TOGGLE_LIKE_DISLIKE = "TOGGLE_LIKE_DISLIKE";
export const RESET_STATE = "RESET_STATE";

export const addMessage = (text, isUser) => ({
  type: ADD_MESSAGE,
  payload: { text, isUser },
});

export const showRating = (isVisible = false) => ({
  type: SHOW_RATING,
  payload: isVisible,
});

export const setRating = (rating) => ({
  type: SET_RATING,
  payload: rating,
});

export const showFeedback = (isVisible = true) => ({
  type: SHOW_FEEDBACK,
  payload: isVisible,
});

export const setFeedback = (feedback) => ({
  type: SET_FEEDBACK,
  payload: feedback,
});

export const toggleLikeDislike = (index, isLike, isHovered) => ({
  type: TOGGLE_LIKE_DISLIKE,
  payload: { index, isLike, isHovered },
});

export const resetState = () => ({
  type: RESET_STATE,
});
