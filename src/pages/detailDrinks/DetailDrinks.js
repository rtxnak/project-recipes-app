import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareImg from '../../images/shareIcon.svg';
import Button from '../../components/button/Button';
import fetchAPI from '../../services/fetchAPI';
import './DetailDrinks.css';

const CUT = '/drinks/';
function DetailDrink() {
  const [returnAPIDrink, setReturnAPIDrink] = useState('');
  const location = useLocation();
  const sliceLocationId = location.pathname.split(CUT)[1];

  // console.log(location.pathname);
  // console.log(sliceLocationId);
  useEffect(() => {
    const returnFetchApi = async () => {
      const result = await fetchAPI('fetchCocktailById', sliceLocationId);
      setReturnAPIDrink(result);
    };
    returnFetchApi();
  }, [sliceLocationId]);
  console.log(sliceLocationId);
  const history = useHistory();
  const [linkCopy, setLinkCopy] = useState(false);
  const linkC = () => {
    copy(window.location.href);
    setLinkCopy(true);
  };
  return (
    <div>
      {
        returnAPIDrink
      && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ returnAPIDrink.drinks[0].strDrinkThumb }
            alt="img"
          />
          <title
            data-testid="recipe-title"
          >
            { returnAPIDrink.drinks[0].strDrink }
          </title>
          <button
            data-testid="share-btn"
            type="button"
            onClick={ linkC }
          >
            <img src={ shareImg } alt="share icon" />
          </button>
          {linkCopy ? <p>Link copied!</p> : null}
          <Button
            testid="favorite-btn"
            label="favorite"
            type="button"
          />
          <span data-testid="recipe-category" />
          <span data-testid="$ {index}-ingredient-name-and-measure" />
          <span data-testid="instructions" />
          <span data-testid="$ {index}-recomendation-card" />
          <button
            testid="start-recipe-btn"
            label="Start Recipe"
            type="button"
            // className="buttonstart"
            bottom="0px"
            position="fixed"
            onClick={ () => history.push(`/drinks/${sliceLocationId}/in-progress`) }
          >
            Start Recipe
          </button>
        </div>
      )
      }
    </div>
  );
}

export default DetailDrink;
