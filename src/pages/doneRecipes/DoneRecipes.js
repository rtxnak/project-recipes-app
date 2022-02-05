import React, { useState, useEffect } from 'react';
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipesLocal, setDoneRecipesLocal] = useState('');
  useEffect(() => {
    const getRecipesLocalstorage = () => {
      const dataLocalstorage = localStorage.getItem('doneRecipes');
      const dataLocal = JSON.parse(dataLocalstorage);
      console.log(dataLocalstorage);
      setDoneRecipesLocal(dataLocal);
    };
    getRecipesLocalstorage();
  }, []);

  return (
    <div>
      <Header
        label="Done Recipes"
        testid="page-title"
      />
      <Button
        type="button"
        testid="filter-by-all-btn"
        label="All"
      // onClick={ onClick }
      // disabled={ disabled }
      // className={ className }
      />
      <Button
        type="button"
        testid="filter-by-food-btn"
        label="Food"
      />
      <Button
        type="button"
        testid="filter-by-drink-btn"
        label="Drinks"
      />
      { doneRecipesLocal && (doneRecipesLocal.map((value, index) => (
        <div key={ index }>
          <img
            src={ value.image }
            data-testid={ `${index}-horizontal-image` }
            alt={ value.name }
          />
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >
            { value.category }
          </h3>
          <h3
            data-testid={ `${index}-horizontal-name` }
          >
            {value.name}
          </h3>
          <h3
            data-testid={ `${index}-horizontal-done-date` }
          >
            { value.date }
          </h3>

          <h3
            data-testid={ `${index}-${value.tags}-horizontal-tag` }
          >
            { value.tags }
          </h3>
          <button
            type="button"
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ shareIcon }
            />
          </button>
        </div>
      ))) }
    </div>
  );
}

export default DoneRecipes;
