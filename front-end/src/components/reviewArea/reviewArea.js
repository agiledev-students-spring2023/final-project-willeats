import React, { useState } from 'react'
import StarRatings from 'react-star-ratings'
import './reviewArea.css'
import '../../bootstrap.css'
import { useLocation } from "react-router-dom";

function ReviewArea(props){
  const location = useLocation()
  const [review, setReview] = useState(props.review)
  const [rating, setRating] = useState(parseInt(new URLSearchParams(location.search).get('star')))
  const [preimage, setPreimage] = useState(new URLSearchParams(location.search).getAll('image')) //preview
  const [image, setImage] = useState([])

  const handleChange = (event) => {
    setReview(event.target.value)
  }

  const changeRating = (newRating) =>{
    setRating(newRating)
  }

  const handleUpload = (e) => {
    if(!e.target.files || e.target.files.length === 0){
      return
    }else{
      setImage([...image, e.target.files[0]])
      setPreimage([...preimage, window.URL.createObjectURL(e.target.files[0])])
    }
  }

  const handleImageClick = (index) => {
    let newImage = [...image]
    let newPreimage = [...preimage]
    newImage.splice(index, 1)
    newPreimage.splice(index, 1)
    setImage(newImage)
    setPreimage(newPreimage)
  }

  

  return(
    
      <div className='card rounded m-1 '>
        <div className='row m-1 p-0'>
          <StarRatings
            rating={isNaN(rating) ? 0 : rating}
            changeRating={changeRating}
            starDimension="20px"
            starSpacing="4px"
            name={props.name}
          />
        </div>
        <div className='row m-1'>
          <div className="form-group p-0">
            <textarea className="form-control noOutline"
              id="exampleTextarea"
              rows="3"
              placeholder='write something...'
              onChange={handleChange}
              value={review} ></textarea>
          </div>
        </div>
        <div className='row m-1'>
          {preimage && preimage.map((element, index) => (
            <div key={index} className='image-container mt-1'>
              <img src={element} alt={element} className='img img-thumbnail' onClick={() => handleImageClick(index)} />
            </div>
          ))}
        </div>
        <div className='row'>
          <div className="input-group ">
            <input type="file" className="form-control" id="inputGroupFile01" onChange={handleUpload}/>
          </div>
        </div>
      </div>
    
  )
}

export default ReviewArea