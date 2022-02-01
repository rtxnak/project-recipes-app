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

  async function handleFoodSurprise() {
    const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const promise = await fetch(ENDPOINT);
    const response = await promise.json();
    const { idMeal } = response.meals[0];
    return history.push(`/foods/${idMeal}`);
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
        onClick={ () => handleFoodSurprise() }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
