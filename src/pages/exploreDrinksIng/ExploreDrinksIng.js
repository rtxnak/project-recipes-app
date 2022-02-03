import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import IngredientCard from '../../components/ingredientCard/IngredientCard';
import fetchIngredientsAPI from '../../services/fetchIngredientsAPI';

function ExploreDrinksIng() {
  // const history = useHistory();
  const location = useLocation();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredientsAPI = async () => {
      const responseAPI = await fetchIngredientsAPI(location.pathname);
      setIngredients(responseAPI);
      console.log(responseAPI);
    };
    getIngredientsAPI();
  }, [location.pathname]);

  return (
    <div>
      <Header
        label="Explore Ingredients"
        testid="page-title"
      />
      {ingredients && ingredients.map((ingredient, i) => (
        <IngredientCard
          key={ i }
          src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
          index={ i }
          alt={ ingredient }
          label={ ingredient }
        />
      ))}
      <Footer />
    </div>
  );
}

export default ExploreDrinksIng;
