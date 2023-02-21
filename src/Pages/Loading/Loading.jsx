import React from 'react'

import "./Loading.css";
import loading from "./loadingwhite.svg";

const Loading = () => {
  return (
    <>
        <div className="loading">
            <img className='loadingImage' src={loading} alt="Loading" />
        </div>
    </>
  )
}

export default Loading
