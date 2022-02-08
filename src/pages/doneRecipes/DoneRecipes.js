import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipesLocal, setDoneRecipesLocal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filterByCategory = (category) => {
    console.log(category);
    setSelectedCategory(category);
  };

  useEffect(() => {
    const getRecipesLocalstorage = () => {
      const dataLocalstorage = localStorage.getItem('doneRecipes');
      const dataLocal = JSON.parse(dataLocalstorage);
      setDoneRecipesLocal(dataLocal);
    };
    getRecipesLocalstorage();
  }, []);

  const [linkCopy, setLinkCopy] = useState(false);
  const linkC = (value) => {
    if (value.type === 'food') {
      const link = `http://localhost:3000/foods/${value.id}`;
      copy(link);
      setLinkCopy(true);
    }
    if (value.type === 'drink') {
      const link = `http://localhost:3000/drinks/${value.id}`;
      copy(link);
      setLinkCopy(true);
    }
  };

  const redirectByid = (value) => {
    if (value.type === 'food') {
      return `foods/${value.id}`;
    }
    if (value.type === 'drink') {
      return `drinks/${value.id}`;
    }
  };

  return (
    <div>
      <div>
        <Header
          label="Done Recipes"
          testid="page-title"
        />
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name=""
          onClick={ ({ target: { name } }) => filterByCategory(name) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="food"
          onClick={ ({ target: { name } }) => filterByCategory(name) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="drink"
          onClick={ ({ target: { name } }) => filterByCategory(name) }
        >
          Drinks
        </button>
      </div>
      { doneRecipesLocal && (
        doneRecipesLocal
          .filter((recipe) => (recipe.type.includes(selectedCategory)))
          .map((value, index) => (
            <div key={ index }>
              <Link
                to={ () => redirectByid(value) }
              >
                <img
                  src={ value.image }
                  data-testid={ `${index}-horizontal-image` }
                  alt={ value.name }
                  width="200px"
                />
              </Link>
              <h3
                data-testid={ `${index}-horizontal-top-text` }
              >
                {value.type === 'food'
                  ? `${value.nationality} - ${value.category}` : value.alcoholicOrNot }
              </h3>
              <Link
                to={ () => redirectByid(value) }
              >
                <h3
                  data-testid={ `${index}-horizontal-name` }
                >
                  {value.name}
                </h3>
              </Link>
              <h3
                data-testid={ `${index}-horizontal-done-date` }
              >
                { value.doneDate }
              </h3>
              { value.tags.length > 1
                ? value && value.tags.map((tag, i) => (
                  <h3
                    key={ i }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </h3>
                )) : <h3>{value.tags}</h3>}
              <button
                type="button"
                onClick={ () => linkC(value) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share icon"
                />
              </button>
              { linkCopy ? <p>Link copied!</p> : null }
            </div>
          ))) }
    </div>
  );
}

export default DoneRecipes;
