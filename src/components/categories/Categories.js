import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Button from '../button/Button';
import fetchCategoriesAPI from '../../services/fetchCategoriesAPI';

const Categories = ({ onClick }) => {
  const [categories, setCategories] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const getCategoriesAPI = async () => {
      const responseAPI = await fetchCategoriesAPI(location.pathname);
      setCategories(responseAPI);
    };
    getCategoriesAPI();
  }, [location.pathname]);

  return (
    <div>
      {categories && categories.map((category, i) => (
        <Button
          key={ i }
          label={ category }
          testid={ `${category}-category-filter` }
          onClick={ () => onClick(category) }
          disabled={ false }
        />
      ))}
      <Button
        label="All"
        testid="All-category-filter"
        onClick={ () => onClick('all') }
        disabled={ false }
      />
    </div>
  );
};

Categories.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Categories;
