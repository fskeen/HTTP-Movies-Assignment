import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const Movie = (props) => {
  const [movie, setMovie] = useState();
  const [movieSaved, setMovieSaved] = useState(false);
 
  useEffect(() => {
    const id = props.match.params.id;
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

  },[props.match.params.id]);

  
  // Uncomment this only when you have moved on to the stretch goals

  useEffect(() => {
    if (movieSaved===true) {
      const addToSavedList = props.addToSavedList;
      console.log("IN THE FUNCTION: ", movie)
      return addToSavedList(movie);
    }
    return;
  }, [movieSaved])

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard key={movie.id} movie={movie}/>
      <div onClick={() => setMovieSaved(true)} className="save-button">Save</div>
    </div>
  );
}

export default Movie;
