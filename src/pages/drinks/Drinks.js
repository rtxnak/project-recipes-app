import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import GlobalContext from '../../context/GlobalContext';
import fetchAPI from '../../services/fetchAPI';
import Categories from '../../components/categories/Categories';
import fetchByCategoryAPI from '../../services/fetchByCategoryAPI';

export default function Drinks() {
  const {
    renderDrinkRecipes,
    filterResult,
    setfilterResult,
    ingredients,
  } = useContext(GlobalContext);

  const location = useLocation();

  const [recipes, setRecipes] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const mainScreenMeals = async () => {
    const mainScreenRecipes = await fetchAPI('fetchCocktailByName', '');
    setRecipes(mainScreenRecipes);
  };

  const filterByCategory = async (category) => {
    if (selectedCategory === category || category === 'all') {
      const mainScreenRecipes = await fetchAPI('fetchCocktailByName', '');
      setfilterResult(mainScreenRecipes);
      setSelectedCategory('');
    } else {
      const responseAPI = await fetchByCategoryAPI(location.pathname, category);
      setfilterResult(responseAPI);
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    if (ingredients.length === 0) {
      mainScreenMeals();
    }
    setRecipes(filterResult);
  }, []);

  useEffect(() => {
    setRecipes(filterResult);
  }, [filterResult]);

  return (
    <div>
      <Header
        label="Drinks"
        testid="page-title"
      />
      <Categories
        onClick={ filterByCategory }
      />
      {recipes && renderDrinkRecipes(recipes.drinks)}
      <Footer />
    </div>
  );
}
