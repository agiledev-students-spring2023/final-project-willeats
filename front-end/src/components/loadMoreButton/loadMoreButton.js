import React from 'react';

import '../../bootstrap.css';
import axios from 'axios';
function LoadMoreButton(props) {
    const handleClick = () => {
        axios.get(props.url)
        .then((res) => {
            const newData = [...props.data, ...res.data]
            props.setdata(newData)
        })
        .catch((err) => (
            console.log(err)
        ))
    }
     return(
        <button type="button" className="btn btn-warning btn-sm" onClick={handleClick}>Load More...</button>
    )
}

export default LoadMoreButton