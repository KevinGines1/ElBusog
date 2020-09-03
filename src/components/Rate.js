import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import './Rate.css';

const Rate = (props) => {

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleChange = event => setRating(event.target.value)

  useEffect(() => {
    if (props.onChange) {
      props.onChange(rating)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating])

  return (
    <div>
      {[ ...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
            className = "form-radio"
            type = "radio"
            name = "rating"
            value = {ratingValue}
            onClick = {() => setRating(ratingValue)}
            onChange = {handleChange}
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
