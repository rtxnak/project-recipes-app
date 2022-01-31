import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

function ExploreFoods() {
  const history = useHistory();

  function handleIngredient() {
    return history.push('/explore/foods/ingredients');
  }

  function handleNationality() {
    return history.push('/explore/foods/nationalities');
  }

  return (
    <div>
      <Header
        label="Explore Foods"
        testid="page-title"
      />
      <button
        onClick={ handleIngredient }
        type="button"
        data-testid="explore-by-ingredient"
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ handleNationality }
      >
        By Nationality
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

export default ExploreFoods;
