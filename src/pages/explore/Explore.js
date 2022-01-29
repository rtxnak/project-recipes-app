import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button/Button';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

function Explore() {
  const history = useHistory();

  const handleClickDrink = () => {
    history.push('/explore/drinks');
  };

  const handleClickFoods = () => {
    history.push('/explore/foods');
  };

  return (
    <div>
      <Header
        label="Explore"
        testid="page-title"
      />
      <Button
        type="button"
        testid="explore-foods"
        label="Explore Foods"
        onClick={ handleClickFoods }
      />
      <Button
        type="button"
        testid="explore-drinks"
        label="Explore Drinks"
        onClick={ handleClickDrink }
      />
      <Footer />
    </div>
  );
}

export default Explore;
