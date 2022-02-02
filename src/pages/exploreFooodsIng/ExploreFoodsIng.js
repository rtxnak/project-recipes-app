import React from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

function ExploreFoodsIng() {
  return (
    <div>
      <Header
        label="Explore Ingredients"
        testid="page-title"
      />
      <div data-testid={ `${index}-ingredient-card` }>
        {/* <img
          data-testid="${index}-card-img"
          src='ik'
        />
        <h3 data-testid="${index}-card-name"/> */}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsIng;
