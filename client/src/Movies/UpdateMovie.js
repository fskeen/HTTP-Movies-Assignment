import React, { useState, useEffect } from 'react'
import axios from 'axios'


function UpdateMovie (props) {

    const [updatedMovie, setUpdatedMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    useEffect(() => {
        const id = props.match.params.id;
        const movieInArr = props.movies.find(movie => `${movie.id}` === id);
        if (movieInArr) setUpdatedMovie(movieInArr);
    }, [props.movies, props.match.params.id]);

   
    const handleChange = (e) => {
      const newMovie = {
        ...updatedMovie,
        [e.target.name]: e.target.value
        }
        setUpdatedMovie(newMovie);  
    }
    
    
    
    const handleSubmit = e => {
        e.preventDefault();
        console.log("updated movie!!", updatedMovie)
        console.log(props.match.params.id)
        axios
          .put(`http://localhost:5000/api/movies/${props.match.params.id}`, updatedMovie)
          .then(res => {
                console.log(res.data);
                // setUpdatedMovie(initialMovie);
                // props.setMovies(res.data);
                props.history.push('/');
                console.log('LOOK AT MEEE', props.movies)
            })
        
          .catch(err => console.log(err.response));
    };
    

    return (
        <form 
        onSubmit={handleSubmit}>
            <label htmlFor="">Title</label>
            <input
                type="text"
                name="title"
                id="title"
                value={updatedMovie.title}
                placeholder="Title"
                onChange={handleChange}
                />
            <label htmlFor="director">director</label>
            <input
                type="text"
                name="director"
                id="director"
                value={updatedMovie.director}
                placeholder="director"
                onChange={handleChange}
                />
            <label htmlFor="">metascore</label>
            <input
                type="number"
                name="metascore"
                id="metascore"
                value={updatedMovie.metascore}
                placeholder="metascore"
                onChange={handleChange}
                />
                <button type="submit"> Update Movie</button>
                {console.log('update on change? ' , updatedMovie)}
        </form>
    )
}

export default UpdateMovie;