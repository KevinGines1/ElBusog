import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './Rate.css';

const Rate = () => {

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[ ...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input
            className = "form-radio"
            type = "radio"
            name = "rating"
            value = {ratingValue}
            onClick = {() => setRating(ratingValue)}
            />
            <FaStar
            className = "star"
            size = {40}
            color = {ratingValue <= (hover || rating) ? '#ffc107' : 'e4e5e9'}
            onMouseEnter = {() => setHover(ratingValue)}
            onMouseLeave = {() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rate;
