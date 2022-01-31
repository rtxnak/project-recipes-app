import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import GlobalContext from '../../context/GlobalContext';
import fetchAPI from '../../services/fetchAPI';
import Categories from '../../components/categories/Categories';

function Foods() {
  const {
    renderFoodRecipes,
    filterResult,
  } = useContext(GlobalContext);
  // console.log(filterResult);

  const [recipes, setRecipes] = useState('');

  const mainScreenMeals = async () => {
    const mainScreenRecipes = await fetchAPI('fetchMealByName', '');
    setRecipes(mainScreenRecipes);
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
      <Categories />
      {recipes && renderFoodRecipes(recipes.meals)}
      <Footer />
    </div>
  );
}

export default Foods;
