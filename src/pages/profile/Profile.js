import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

function Profile() {
  const [emailLocalStorage, setEmailLocalStorage] = useState('');

  function fetchEmail() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { email } = user;
    setEmailLocalStorage(email);
  }

  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <div>
      <Header label="Profile" testid="page-title" />
      <p data-testid="profile-email">{ emailLocalStorage }</p>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
      <Footer />
    </div>
  );
}

export default Profile;
