import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import GlobalContext from '../../context/GlobalContext';
import fetchAPI from '../../services/fetchAPI';
import Categories from '../../components/categories/Categories';
import fetchByCategoryAPI from '../../services/fetchByCategoryAPI';

function Foods() {
  const {
    renderFoodRecipes,
    filterResult,
    setfilterResult,
  } = useContext(GlobalContext);

  const location = useLocation();

  const [recipes, setRecipes] = useState('');

  const mainScreenMeals = async () => {
    const mainScreenRecipes = await fetchAPI('fetchMealByName', '');
    setRecipes(mainScreenRecipes);
  };

  const filterByCategory = async (category) => {
    const responseAPI = await fetchByCategoryAPI(location.pathname, category);
    setfilterResult(responseAPI);
  };

  useEffect(() => {
    mainScreenMeals();
  }, []);

  useEffect(() => {
    setRecipes(filterResult);
  }, [filterResult]);

  return (
    <div>
      <Header
        label="Foods"
        testid="page-title"
      />
      <Categories
        onClick={ filterByCategory }
      />
      {recipes && renderFoodRecipes(recipes.meals)}
      <Footer />
    </div>
  );
}

export default Foods;
