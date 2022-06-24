import React from 'react';
import shareIcon from '../images/shareIcon.svg';

export default function Share() {
  return (
    <div>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="share-icon" />
      </button>
    </div>
  );
}
