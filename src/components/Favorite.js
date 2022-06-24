import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function Favorite() {
  return (
    <div>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favorite-icon" />
      </button>
    </div>
  );
}
