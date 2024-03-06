import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addMessage,
  showRating,
  setRating,
  showFeedback,
  setFeedback,
  toggleLikeDislike,
  resetState,
  SHOW_RATING,
} from "./actions";
import FilterRatingFn from "./filterRating";
import StarRating from "./starRating";
import "@fortawesome/fontawesome-free/css/all.css";
import { Button } from "antd";

const AIChatApp = () => {
  const dispatch = useDispatch();
  const {
    messages,
    showRating: isRatingVisible,
    rating,
    showFeedback: isFeedbackVisible,
    feedback,
  } = useSelector((state) => state);
  const [userInput, setUserInput] = useState("");
  const [newChat, setNewChat] = useState(true);
  const [individualMessages, SetIndividualMessages] = useState([]);
  const aiResponses = {
    hello: "Hi there!",
    "how are you": "I'm just a computer program, but thanks for asking!",
    bye: "Goodbye! Have a great day!",
  };
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };
  const handleSendMessage = () => {
    const userMessage = userInput.trim().toLowerCase();
    const aiMessage =
      aiResponses[userMessage] || "I'm not sure how to respond to that.";

    dispatch(addMessage(userInput, true));
    dispatch(addMessage(aiMessage, false));

    if (userInput === "bye") {
      setTimeout(() => {
        dispatch(showRating(SHOW_RATING, true));
      }, 1000);
    }

    setUserInput("");
  };

  const handleSetRating = (rating) => {
    dispatch(setRating(rating));
    handleShowFeedback();
  };

  const handleShowFeedback = () => {
    dispatch(showFeedback());
  };

  const handleSetFeedback = (feedback) => {
    dispatch(setFeedback(feedback));
  };
  const handleFeedbackSubmit = () => {
    const tempData = { messages: messages, feedback: feedback, rating: rating };

    localStorage.setItem("filterRatings", [
      localStorage.getItem("filterRatings") || [],
      JSON.stringify(tempData),
    ]);
    dispatch(resetState());
  };

  const handleLikeDislike = (index, isLiked, isHovered) => {
    dispatch(toggleLikeDislike(index, isLiked, isHovered));
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const renderAIMessages = () => {
    return messages.map((message, index) => (
      <div
        key={index}
        style={{
          marginBottom: "8px",
          color: message.isUser ? "green" : "blue",
          textAlign: message.isUser ? "left" : "right",
        }}
      >
        <div>{message.text}</div>
        {!message.isUser && (message.liked || message.disliked) ? (
          <div className="like-dislike-buttons">
            {message.liked && (
              <button
                className={`like ${message.liked ? "selected" : ""}`}
                onClick={() => handleLikeDislike(index, true, true)}
              >
                👍
              </button>
            )}
            {message.disliked && (
              <button
                className={`dislike ${message.disliked ? "selected" : ""}`}
                onClick={() => handleLikeDislike(index, false, true)}
              >
                👎
              </button>
            )}
          </div>
        ) : (
          !message.isUser && (
            <div className="like-dislike-buttons">
              <button
                className={`like ${message.liked ? "selected" : ""}`}
                onClick={() => handleLikeDislike(index, true, true)}
              >
                👍
              </button>
              <button
                className={`dislike ${message.disliked ? "selected" : ""}`}
                onClick={() => handleLikeDislike(index, false, true)}
              >
                👎
              </button>
            </div>
          )
        )}
      </div>
    ));
  };
  return (
    <div className="chat-app flex">
      <div className="border border-zinc-900 w-[40vw] m-2 p-3">
        <div className="chat-window ">
          <Button
            onClick={() => {
              setNewChat(true);
            }}
            style={{ background: "green", color: "white" }}
          >
            New Chat
          </Button>
        </div>
        <FilterRatingFn
          setNewChat={setNewChat}
          newChat={newChat}
          SetIndividualMessages={SetIndividualMessages}
        />
      </div>
      {newChat ? (
        <div className="w-[60vw] border border-zinc-900 m-2 p-3">
          {renderAIMessages()}
          <div className="user-input">
            <input
              type="text"
              value={userInput}
              onChange={handleUserInput}
              onKeyPress={handleEnterKeyPress}
              className="border border-zinc-900 m-2"
            />
            <button
              onClick={handleSendMessage}
              className="px-2 border border-zinc-500 hover:bg-zinc-400 m-2"
            >
              Send
            </button>
          </div>
          {showRating && (
            <div className="user-actions m-2 flex flex-col align-center">
              <div className="m-2">
                <p>Rate the conversation:</p>
                <StarRating rating={rating} handleSetRating={handleSetRating} />
              </div>
              <textarea
                placeholder="Type your feedback here..."
                onChange={(e) => handleSetFeedback(e.target.value)}
                value={feedback}
                className="border border-zinc-900 p-2 m-2"
              />
              <div>
                <button
                  onClick={handleFeedbackSubmit}
                  className="m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-[60vw] border border-zinc-900 m-2 p-3">
          {individualMessages.map((message, index) => (
            <div
              key={index}
              style={{
                marginBottom: "8px",
                color: message.isUser ? "green" : "blue",
                textAlign: message.isUser ? "left" : "right",
              }}
            >
              <div>{message.text}</div>
              <div className="like-dislike-buttons">
                {message.liked && <div>👍</div>}
                {message.disliked && <div>👎</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIChatApp;
