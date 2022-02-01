import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

function ExploreDrinks() {
  const history = useHistory();

  function handleDrinkIngredient() {
    return history.push('/explore/drinks/ingredients');
  }

  async function handleDrinkSurprise() {
    const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const promise = await fetch(ENDPOINT);
    const response = await promise.json();
    const { idDrink } = response.drinks[0];
    return history.push(`/drinks/${idDrink}`);
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
        onClick={ () => handleDrinkSurprise() }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
