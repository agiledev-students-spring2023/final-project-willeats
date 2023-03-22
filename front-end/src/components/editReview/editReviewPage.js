import React, { useEffect, useState } from 'react'
import {useLocation } from "react-router-dom";
import '../../bootstrap.css'
import ReviewArea from '../reviewArea/reviewArea.js'
import PageBackButton from '../pagebackButton/PageBackButton'; 
function EditReviewPage() {
    const location = useLocation()

    return(
        <div className='mt-1'>
            <div className='row'>

                <div className='col'>
                    <PageBackButton />
                    <p className='fs-3 m-1'>Edit the review for...</p>
                    <h1 className='m-1 fw-bold'>{new URLSearchParams(location.search).get('mainName')}</h1>
                    <p className='fs-4 m-1'>{new URLSearchParams(location.search).get('itemName')}</p>
                    <ReviewArea name={new URLSearchParams(location.search).get('itemName')} 
                                review={new URLSearchParams(location.search).get('review')} 
                                image={new URLSearchParams(location.search).getAll('image')} />
                    <div className='d-grid gap-2 col-5 mx-auto mt-3'>
                        {/* handle save */}
                        <button type="button" className="btn btn-primary">Save</button> 
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditReviewPage