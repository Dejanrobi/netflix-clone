// ensure you are importing axios from our local axios  file
import instance from "../../axios";
// importing requests
import requests from "../../Request";
import React, { useEffect, useState } from 'react';
import { banner } from '../../Constants/images';

// Importing css
import "./Banner.css";
const Banner = () => {

  // Movie state
  const [movie, setMovie] = useState([]);

  // Fetching the movie data using useEffect
  useEffect(()=>{
    async function fetchData(){
      const request = await instance.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[
        Math.floor(Math.random()*request.data.results.length - 1)
      ]);

      return request;
    }

    fetchData();

  }, [])

  console.log(movie)

  // truncate the description
  function truncate(string, n){
    return string?.length > n ? string.substr(0, n-1) + '...' : string;

  }
  return (
    <header className='banner' 
    style={{
      // backgroundImage: "url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolHRUVITEhJSkrOi4uFx8/ODMtNyg5LisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAgEH/8QAFRABAQAAAAAAAAAAAAAAAAAAABH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A4nCKhASRUICYRUICYKhATCKhATCKhATBUICYKhATBUICYKhASRUICYRUICSKhASRUICYKhASRUICSKhATCKhATCKhAXCLhARCKjYCIRUbARCLhARCLhARCLhARCLhARCLhARCLjICYRUICYRcZATCLjICYRcICIRcICIRUbARCLhARCLhARCLjICYRcZAXCAAAAAAAAAAABAAIAAAAABCAAQAAACAAAAQAAAAAIQAZSopQXRFKC6VFKCxFKC6IpQXRFKC6VFKCyopQXRFKC6VFKCyopQXSopQXRFKC6VFKC6IpQXRFKC6IpQXSopQXRFKCKVNKCqVNKCqVNKCqVNKCq2opQVSppQVSppQVSppQXWVNKCq2opQVSppQVSppQVSppQXWVNKCqVNKCqVNKCq2opQXWVNKCqVNKCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoDBoDBoDAABoDBoDAAAAAAAAAAAAAABoDAAAAAAf/2Q==")",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
    }}>
      <div className="banner__contents">
        <h1 className="banner__title">
            {
              movie?.title || movie?.name || movie?.original_name
            }
        </h1>
        <div className="banner__buttons">
            <button className='banner__button'>Play</button>
            <button className='banner__button'>My List</button>
        </div>
        <h1 className="banner__description">
          {
            truncate(movie?.overview, 150)
          }
            
        </h1>
      </div>

      <div className="banner--fadeBottom"/>

      
    </header>
  )
}

export default Banner
