import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileIcon from '../images/profileIcon.svg';
import './Profile.css';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || '';
    setUserEmail(user.email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <div className="profile-container">
      <Header img1={ ProfileIcon } title="Profile" />
      <h5
        className="user-email"
        data-testid="profile-email"
      >
        {userEmail}

      </h5>
      <div className="button-tags">
        <Button
          type="button"
          variant="primary"
          className="button-width"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </Button>
        <Button
          type="button"
          variant="primary"
          className="button-width"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </Button>
        <Button
          type="button"
          variant="primary"
          className="button-width"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
