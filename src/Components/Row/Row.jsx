// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./Row.css";
import instance from "../../axios";
const Row = ({title, fetchUrl, isLargeRow=false}) => {
    const [rowMovies, setRowMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(()=>{
        async function fetchData(){
            const request = await instance.get(fetchUrl);
            setRowMovies(request.data.results);

            // any async function should return a value
            return request;
        }

        // execute fetchData
        fetchData();

    },[fetchUrl])

    // console.log(rowMovies);
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className="row__posters">
        {/* Conditon incase there is a dead link*/}
        {   

            rowMovies.map(movie=>(
                ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) &&(
                    <img className={`row__poster ${isLargeRow && "row__posterLarge"}`} key={movie.id} src={`${base_url}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} alt={movie.name} />
                )
                
            ))
        }
      </div>

      
    </div>
  )
}

export default Row
