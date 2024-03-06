import { combineReducers } from "redux";
import {
  ADD_MESSAGE,
  SHOW_RATING,
  SET_RATING,
  SHOW_FEEDBACK,
  SET_FEEDBACK,
  TOGGLE_LIKE_DISLIKE,
  RESET_STATE,
} from "./actions";

const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        ...state,
        {
          text: action.payload.text,
          isUser: action.payload.isUser,
          liked: false,
          disliked: false,
        },
      ];
    case TOGGLE_LIKE_DISLIKE:
      const newState = [...state];
      const message = newState[action.payload.index];
      if (action.payload.isHovered) {
        message.liked = action.payload.isLike;
        message.disliked = !action.payload.isLike;
      } else {
        message.liked = false;
        message.disliked = false;
      }
      return newState;
    case RESET_STATE:
      return [];
    default:
      return state;
  }
};

const showRating = (state = false, action) => {
  switch (action.type) {
    case SHOW_RATING:
      return action.payload;
    case RESET_STATE:
      return false;
    default:
      return state;
  }
};

const rating = (state = null, action) => {
  console.log(action, "rating");
  switch (action.type) {
    case SET_RATING:
      return action.payload;
    case RESET_STATE:
      return null;
    default:
      return state;
  }
};

const showFeedback = (state = false, action) => {
  switch (action.type) {
    case SHOW_FEEDBACK:
      return action.payload;
    case RESET_STATE:
      return false;
    default:
      return state;
  }
};

const feedback = (state = "", action) => {
  console.log(action, "feed");
  switch (action.type) {
    case SET_FEEDBACK:
      return action.payload;
    case RESET_STATE:
      return "";
    default:
      return state;
  }
};

export default combineReducers({
  messages,
  showRating,
  rating,
  showFeedback,
  feedback,
});
