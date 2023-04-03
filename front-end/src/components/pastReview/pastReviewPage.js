import {React, useState, useEffect} from 'react'
import {useNavigate, Link} from "react-router-dom";
import ReviewCard from '../reviewCards/reviewCard.jsx'
import axios from 'axios';
import '../../bootstrap.css'
import LoadMoreButton from '../loadMoreButton/loadMoreButton';
import PageBackButton from '../pagebackButton/PageBackButton.js';
import HomeButton from '../profile/HomeButton.js';
function PastReviewPage() {

    const [reviewData, setReviewData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/userpastreview')
        .then((res) => {
            setReviewData(res.data)
            console.log(res)
        })
        .catch((err) => (
            console.log(err)
        ))
    }, []);
    const handleDelete = (e) => {
        e.preventDefault()
        const index = e.target.getAttribute('keys')
        const newData = [...reviewData]
        newData.splice(index, 1)
        setReviewData(newData)
    }
    return(
        <div className='mt-1 mw-40'>
            <div className='row'>

                <div className='col'>
                    <div className='d-flex justify-content-between'>
                        <PageBackButton/>
                        <HomeButton/>
                    </div>
                    <div className='col'>
                        <h1 className='m-1'>My Reviews</h1>
                        
                        <small className="text-muted m-1">{reviewData.length} review</small>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        {reviewData != null && reviewData.map((element, index) => (
                            <ReviewCard 
                                mainName={element.name} 
                                itemName={element.itemName} 
                                review={element.review} 
                                key={index} 
                                keys={index}
                                date={element.date} 
                                star={element.star}
                                image={element.restImage}
                                reviewImage={element.reviewImage}
                                handleDelete={handleDelete} />
                        ))}
                    </div>
                    <div className='d-flex justify-content-center mt-2'>
                        
                        {reviewData.length > 0 && <LoadMoreButton url={'http://localhost:3001/userpastreview'} data={reviewData} setdata={setReviewData} />}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default PastReviewPage
