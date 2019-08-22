import React, { useState } from 'react';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import UpdateMovie from './Movies/UpdateMovie';

import { Route } from 'react-router-dom';

const App = () => {
  const [savedList, setSavedList] = useState( [] );
  const [movies, setMovies] = useState([])

  const addToSavedList = movie => {
    setSavedList( [...savedList, movie] );
  };

  

  return (
    <div>
      <SavedList list={savedList} setSavedList={addToSavedList} />

      <Route exact path="/" render={(props) => <MovieList
        {...props}
        movies={movies}
        setMovies={setMovies} />} />

      <Route path="/movies/:id" render={(props) => <Movie {...props} addToSavedList={addToSavedList}/>}></Route>
      
      <Route path="/update-movie/:id" render={(props) => <UpdateMovie {...props} movies={movies} setMovies={setMovies} />}></Route>
      
    </div>
  );
};

export default App;
