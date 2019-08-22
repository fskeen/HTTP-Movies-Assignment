import React, { useState } from 'react';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

import { Route } from 'react-router-dom';

const App = () => {
  const [savedList, setSavedList] = useState( [] );

  const addToSavedList = movie => {
    setSavedList( [...savedList, movie] );
  };

  return (
    <div>
      <SavedList list={savedList} setSavedList={addToSavedList} />

      <Route exact path="/" component={MovieList}></Route>
      <Route path="/movies/:id" render={(props) => <Movie {...props} addToSavedList={addToSavedList}/>}></Route>
    </div>
  );
};

export default App;
