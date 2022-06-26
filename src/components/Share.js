import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function Share({ type, id }) {
  const copyUrl = () => {
    const mainURL = window.location.origin;
    navigator.clipboard.writeText(`${mainURL}/${type}s/${id}`);
  };
  console.log(type, id);
  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copyUrl() }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
    </div>
  );
}

Share.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
