import React, { useContext } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import GlobalContext from '../../context/GlobalContext';

function Foods() {
  const {
    renderFoodRecipes,
    filterResult,
  } = useContext(GlobalContext);
  // console.log(filterResult);

  return (
    <div>
      <Header
        label="Foods"
        testid="page-title"
      />
      {filterResult && renderFoodRecipes(filterResult.meals)}
      <Footer />
    </div>
  );
}

export default Foods;
