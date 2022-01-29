import React from 'react';
import Button from '../../components/button/Button';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

function Explore() {
  return (
    <div>
      <Header
        label="Explore"
        testid="page-title"
      />
      <Button
        type="button"
        testid="explore-foods"
        label="Explore Foods"
        // onClick={ onClick }
        // disabled={ disabled }
      />
      <Button
        type="button"
        testid="explore-drinks"
        label="Explore Drinks"
      />
      <Footer />
    </div>
  );
}

export default Explore;
