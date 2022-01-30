import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

function Profile() {
  const [emailLocalStorage, setEmailLocalStorage] = useState('');
  const history = useHistory();
  console.log(history);

  function fetchEmail() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { email } = user;
    setEmailLocalStorage(email);
  }

  useEffect(() => {
    fetchEmail();
  }, []);

  const handleClickDone = () => {
    history.push('/done-recipes');
  };

  const handleClickFavorite = () => {
    history.push('/favorite-recipes');
  };

  return (
    <div>
      <Header label="Profile" testid="page-title" />
      <p data-testid="profile-email">{ emailLocalStorage }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleClickDone }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleClickFavorite }
      >
        Favorite Recipes
      </button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
      <Footer />
    </div>
  );
}

export default Profile;
