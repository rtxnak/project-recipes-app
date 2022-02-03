import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import fetchAPI from '../../services/fetchAPI';

function RecomendationCard() {
  const location = useLocation();
  const [recommendations, setrecommendations] = useState('');

  useEffect(() => {
    const fetchApiBypathName = async () => {
      if (location.pathname.includes('foods')) {
        const recommendationsFetch = await fetchAPI('fetchCocktailByName', '');
        setrecommendations(recommendationsFetch.drinks);
      }
      if (location.pathname.includes('drinks')) {
        const recommendationsFetch = await fetchAPI('fetchMealByName', '');
        setrecommendations(recommendationsFetch.meals);
      }
    }; fetchApiBypathName();
  }, [location.pathname]);

  // console.log(recommendations);
  const SIX = 6;
  const checkPathname = location.pathname.includes('drinks');
  return (
    <div>
      { recommendations && recommendations.slice(0, SIX)
        .map((recipe, i) => (
          <div
            key={ i }
            data-testid={ `${i}-recomendation-card` }
          >
            <img
              src={ checkPathname ? recipe.strMealThumb : recipe.strDrinkThumb }
              alt={ checkPathname ? recipe.strMeal : recipe.strDrink }
              width="50px"
            />
            <p data-testid={ `${i}-recomendation-title` }>
              { checkPathname ? recipe.strMeal : recipe.strDrink}
            </p>
          </div>
        ))}
    </div>
  );
}

export default RecomendationCard;
