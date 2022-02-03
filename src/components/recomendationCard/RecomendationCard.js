import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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

  const SIX = 6;
  const checkPathname = location.pathname.includes('drinks');

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div
      style={ { display: 'block', width: '100%', padding: 30, margin: 10 } }
    >
      {recommendations && (
        <Carousel
          responsive={ responsive }
        >
          { recommendations.slice(0, SIX)
            .map((recipe, i) => (
              <div
                key={ i }
                data-testid={ `${i}-recomendation-card` }
              >
                <img
                  style={ { width: '95%' } }
                  src={ checkPathname ? recipe.strMealThumb : recipe.strDrinkThumb }
                  alt={ checkPathname ? recipe.strMeal : recipe.strDrink }
                />
                <p
                  data-testid={ `${i}-recomendation-title` }
                >
                  { checkPathname ? recipe.strMeal : recipe.strDrink}
                </p>
              </div>
            ))}
        </Carousel>
      )}
    </div>
  );
}

// https://www.npmjs.com/package/react-multi-carousel

export default RecomendationCard;
