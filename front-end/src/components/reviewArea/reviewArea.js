import React, { useState, useEffect } from 'react'
import StarRatings from 'react-star-ratings'
import './reviewArea.css'
import '../../bootstrap.css'
import { useLocation } from "react-router-dom";
import axios from 'axios';
function ReviewArea(props){
  const location = useLocation()
  const [review, setReview] = useState(props.review)
  const [rating, setRating] = useState(parseInt(new URLSearchParams(location.search).get('star')))
  const [preimage, setPreimage] = useState(new URLSearchParams(location.search).getAll('image')) //preview
  const [image, setImage] = useState([])
  const [preimageLength, setPreimageLength] = useState(new URLSearchParams(location.search).getAll('image').length)
  useEffect(() => {
    if(props.save && review){
      console.log(review)
      const editData = {}
      editData.rating = rating ? rating: 1
      editData.review = review
      editData.preimage = [...preimage]
      editData.image = [...image]
      
      // const current = new Date();
      // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`
      // editData.date = date
      // const formData = new FormData()
      // formData.append("itemName", props.name)
      // formData.append("rating", rating ? 0 : rating)
      // formData.append("review",review)
      // formData.append("date", date)
      // image.map((e) => {
      //   formData.append("image", e)
      // })
      // axios.post("http://localhost:3001/createuserreview", formData)
      //   .then((res) => {
      //     console.log(res.data.message)
      //     props.setTotal((prevTotal) => prevTotal + 1)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
      console.log(props.saveData)
      props.setSaveData((prevSaveData) => [...prevSaveData, editData])
    }
    if(props.save && !review){
      props.setSaveData([])
      props.setSave(false)
      alert('review not null')
    }
  },[props.save]);
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

  const handleImageClick = (e, index) => {
    if(window.confirm('Are you sure you want to delete this image?')){
      let newImage = [...image]
      let newPreimage = [...preimage]
      console.log(index)
      if(index > preimageLength){
        newImage.splice(index - preimageLength, 1)
        newPreimage.splice(index, 1)
      }else{
        setPreimageLength(preimageLength - 1)
        newPreimage.splice(index, 1)
      }
      setImage(newImage)
      setPreimage(newPreimage)
    }
    
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
              <img src={element} alt={element} className='img img-thumbnail' onClick={(e) => handleImageClick(e,index)} />
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