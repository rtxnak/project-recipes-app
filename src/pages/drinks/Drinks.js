import React, { useContext } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import GlobalContext from '../../context/GlobalContext';

export default function Drinks() {
  const {
    renderDrinkRecipes,
    filterResult,
  } = useContext(GlobalContext);
  // console.log(filterResult);
  return (
    <div>
      <Header
        label="Drinks"
        testid="page-title"
      />
      {filterResult && renderDrinkRecipes(filterResult.drinks)}
      <Footer />
    </div>
  );
}
