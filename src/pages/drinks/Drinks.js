import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import GlobalContext from '../../context/GlobalContext';
import fetchAPI from '../../services/fetchAPI';

export default function Drinks() {
  const {
    renderDrinkRecipes,
    filterResult,
  } = useContext(GlobalContext);

  const [recipes, setRecipes] = useState('');

  const mainScreenMeals = async () => {
    const mainScreenRecipes = await fetchAPI('fetchCocktailByName', '');
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
        label="Drinks"
        testid="page-title"
      />
      {recipes && renderDrinkRecipes(recipes.drinks)}
      <Footer />
    </div>
  );
}
