import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import styles from './Share.module.css';

export default function Share({ type, id }) {
  const [message, setMessage] = useState(false);
  const copyUrl = () => {
    setMessage(true);
    const mainURL = window.location.origin;
    navigator.clipboard.writeText(`${mainURL}/${type}/${id}`);
  };

  useEffect(() => {
    const NUMBER = 1000;
    setTimeout(() => {
      setMessage(false);
    }, NUMBER);
  }, [message]);

  return (
    <div className={ styles.container }>
      <div>
        {
          message && <p>Link copied!</p>
        }
      </div>
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
