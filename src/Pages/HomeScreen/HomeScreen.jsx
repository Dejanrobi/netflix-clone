import React from 'react'
import Banner from '../../Components/Banner/Banner';
import Navbar from '../../Components/Navbar/Navbar';
import Row from '../../Components/Row/Row';
import requests from '../../Request';
// Importing the css file
import "./HomeScreen.css";

const HomeScreen = () => {
  return (
    <div className='homescreen'>
      
      {/* Navbar */}
      <Navbar/>
      
      {/* Banner */}
      <Banner/>
      
      {/* Rows */}
      <Row 
        title="NETFLIX ORIGINALS" 
        fetchUrl = {requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row 
        title="Trending Now" 
        fetchUrl = {requests.fetchTrending}
        isLargeRow={false}
      />
      <Row 
        title="Top Rated" 
        fetchUrl = {requests.fetchTopRated}
        isLargeRow={false}
      />
      <Row 
        title="Action Movies" 
        fetchUrl = {requests.fetchActionMovies}
        isLargeRow={false}
      />
      <Row 
        title="Comedy Movies" 
        fetchUrl = {requests.fetchComedyMovies}
        isLargeRow={false}
      />
      <Row 
        title="Horror Movies" 
        fetchUrl = {requests.fetchHorrorMovies}
        isLargeRow={false}
      />
    </div>
  )
}

export default HomeScreen
