import React from 'react';

function Star({ rating, size, setRating }) {
  const fontSize = size ? size : '25px';
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            key={star} // Add a unique key to each star for React's reconciliation
            className="star"
            style={{
              cursor: setRating ? 'pointer' : 'default', // Change cursor based on setRating
              color: rating >= star ? 'gold' : 'gray',
              fontSize: fontSize,
            }}
            onClick={setRating ? () => setRating(star) : undefined} // Conditionally add onClick
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default Star;
