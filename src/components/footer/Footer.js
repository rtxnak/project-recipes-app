import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <Link to="/drinks">
        <button type="button">
          <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explore">
        <button type="button">
          <img src={ exploreIcon } alt="exploreIcon" data-testid="explore-bottom-btn" />
        </button>
      </Link>
      <Link to="/foods">
        <button type="button">
          <img src={ mealIcon } alt="mealIcon" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </div>
  );
}
