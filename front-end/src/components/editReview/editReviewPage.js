import React, { useEffect, useState } from 'react'
import {useLocation } from "react-router-dom";
import '../../bootstrap.css'
import ReviewArea from '../reviewArea/reviewArea.js'
function EditReviewPage() {
    const location = useLocation()
    const reviewData = {'name' : 'Lao Ma Spicy', 
    'date' : '2020/1/3', 
    'star' : 2 , 
    'itemName' : 'Spicy Dry Hot Pot', 
    'review' : 'The breading was light and crispy, and the calamari itself was tender and flavorful. The dipping sauce that came with it was a perfect complement.'}
    // const [review, setReview] = useState('')
    // // change with real data
    // const [rating, setRating] = useState(parseInt(new URLSearchParams(location.search).get('star')))
    // const [preimage, setPreimage] = useState([]) //preview
    // const [image, setImage] = useState([])
    // const handleChange = (event) => {
    //     setReview(event.target.value)
    // }
    // const changeRating = (newRating) =>{
    //     setRating(newRating)
    // }
    // const handleUpload = (e) => {
    //     if(!e.target.files || e.target.files.length === 0){
    //         return
    //     }else{
    //         setImage([...image, e.target.files[0]])
    //         setPreimage([...preimage, window.URL.createObjectURL(e.target.files[0])])
    //     }
    // }
    return(
        <div className='mt-3'>
            <div className='row'>
                <div className='col'>

                </div>
                <div className='col-4'>
                    <p className='fs-3'>Edit the review for...</p>
                    <h1>{new URLSearchParams(location.search).get('mainName')}</h1>
                    <p className='fs-4'>{new URLSearchParams(location.search).get('itemName')}</p>
                    <ReviewArea name={new URLSearchParams(location.search).get('itemName')} />
                    <div className='d-grid gap-2 col-5 mx-auto mt-3'>
                        {/* handle save */}
                        <button type="button" className="btn btn-primary">Save</button> 
                    </div>
                </div>
                
                <div className='col'>

                </div>
            </div>

        </div>
    )
}

export default EditReviewPage