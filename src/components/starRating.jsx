import React from "react";

const StarRating = ({ rating, handleSetRating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => (
        <button
          key={star}
          onClick={() => handleSetRating(star)}
          className={`text-yellow-500 ${
            star <= rating ? "fas" : "far"
          } fa-star cursor-pointer`}
        ></button>
      ))}
    </div>
  );
};

export default StarRating;
