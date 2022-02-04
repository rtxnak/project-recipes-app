import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import IngredientCard from '../../components/ingredientCard/IngredientCard';
import fetchIngredientsAPI from '../../services/fetchIngredientsAPI';
import GlobalContext from '../../context/GlobalContext';

function ExploreFoodsIng() {
  const location = useLocation();
  const {
    ingredients,
    setIngredients,
  } = useContext(GlobalContext);

  useEffect(() => {
    const getIngredientsAPI = async () => {
      const responseAPI = await fetchIngredientsAPI(location.pathname);
      setIngredients(responseAPI);
    };
    getIngredientsAPI();
  }, [location.pathname, setIngredients]);

  return (
    <div>
      <Header
        label="Explore Ingredients"
        testid="page-title"
      />
      {ingredients && ingredients.map((ingredient, i) => (
        <IngredientCard
          key={ i }
          src={ `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` }
          index={ i }
          alt={ ingredient }
          label={ ingredient }
        />
      ))}
      <Footer />
    </div>
  );
}

export default ExploreFoodsIng;
