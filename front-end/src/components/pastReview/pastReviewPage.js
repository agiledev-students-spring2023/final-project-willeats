import React from 'react'
import {useNavigate, Link} from "react-router-dom";
import ReviewCard from '../reviewCards/reviewCard.jsx'

import '../../bootstrap.css'

function PastReviewPage() {
    const reviewData = [{'name' : 'Lao Ma Spicy', 
                        'date' : '2020/1/3', 
                        'star' : 2 , 
                        'itemName' : 'Spicy Dry Hot Pot', 
                        'review' : 'The breading was light and crispy, and the calamari itself was tender and flavorful. The dipping sauce that came with it was a perfect complement.'}]
    return(
        <div className='mt-3'>
            <div className='row'>
                <div className='col'>

                </div>
                <div className='col-4'>
                    <div className='col'>
                        <h1 className='mx-auto'>My Reviews</h1>
                        {/* change with real data */}
                        <small className="text-muted">{reviewData.length} review</small>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        {reviewData.map((element) => (
                            <ReviewCard mainName={element.name} itemName={element.itemName} review={element.review} key={element.name} date={element.date} star={element.star} />
                        ))}
                    </div>
                    <div className='d-flex justify-content-center mt-3'>
                        <button type="button" className="btn btn-warning btn-sm">Load More...</button>
                    </div>
                </div>
                <div className='col'>

                </div>
            </div>

        </div>
    )
}

export default PastReviewPage