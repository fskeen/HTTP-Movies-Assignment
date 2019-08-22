import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import UpdateMovie from './UpdateMovie';

import { Route } from 'react-router-dom'

const Movie = (props) => {
  const [movie, setMovie] = useState();
  const [movieSaved, setMovieSaved] = useState(false);
  const id = props.match.params.id;

  useEffect(() => {
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  }, [ id ]);

  
  // Uncomment this only when you have moved on to the stretch goals

  useEffect(() => {
    if (movieSaved===true) {
      const addToSavedList = props.addToSavedList;
      return addToSavedList(movie);
    }
    return;
  }, [movieSaved])



  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <button
        onClick={() => props.history.push(`/update-movie/${id}`)}
        >Update Movie Info</button>


      <MovieCard key={movie.id} movie={movie}/>

      <button onClick={() => setMovieSaved(true)} className="save-button">Save to faves</button>
    </div>
  );
}

export default Movie;
