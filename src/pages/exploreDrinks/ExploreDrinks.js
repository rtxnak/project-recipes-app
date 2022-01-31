import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

function ExploreDrinks() {
  const history = useHistory();

  function handleDrinkIngredient() {
    return history.push('/explore/drinks/ingredients');
  }

  return (
    <div>
      <Header
        label="Explore Drinks"
        testid="page-title"
      />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ handleDrinkIngredient }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
