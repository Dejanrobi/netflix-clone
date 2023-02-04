import React from 'react';
import { banner } from '../../Constants/images';

// Importing css
import "./Banner.css";
const Banner = () => {
  return (
    <header className='banner' >
      <div className="banner__contents">
        <h1 className="banner__title">
            Movie Name
        </h1>
        <div className="banner__buttons">
            <button className='banner__button'>Play</button>
            <button className='banner__button'>My List</button>
        </div>
        <h1 className="banner__description">
            This is a test description
        </h1>
      </div>

      <div className="banner--fadeBottom"/>

      
    </header>
  )
}

export default Banner
