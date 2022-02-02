import React from 'react';
import { Switch, Route } from 'react-router';
import * as PGS from '../pages';

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ PGS.Login } />
        <Route exact path="/foods" component={ PGS.Foods } />
        <Route exact path="/drinks" component={ PGS.Drinks } />
        <Route exact path="/foods/:id" component={ PGS.DetailFoods } />
        <Route exact path="/drinks/:id" component={ PGS.DetailDrinks } />
        <Route exact path="/foods/:id/in-progress" component={ PGS.ProgressFoods } />
        <Route exact path="/drinks/:id/in-progress" component={ PGS.ProgressDrinks } />
        <Route exact path="/explore" component={ PGS.Explore } />
        <Route exact path="/explore/foods" component={ PGS.ExploreFoods } />
        <Route exact path="/explore/drinks" component={ PGS.ExploreDrinks } />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ PGS.ExploreFoodsIng }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ PGS.ExploreDrinksIng }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ PGS.ExploreFoodsNat }
        />
        <Route exact path="/profile" component={ PGS.Profile } />
        <Route exact path="/done-recipes" component={ PGS.DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ PGS.FavoriteRecipes } />
        <Route exact path="/explore/drinks/nationalities" component={ PGS.NotFound } />
      </Switch>
    </div>
  );
}

export default Routes;
