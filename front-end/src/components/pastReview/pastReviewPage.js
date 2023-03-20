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
        axios.get('https://my.api.mockaroo.com/pastreview1234.json?key=3c15f680')
        .then((res) => {
            setReviewData(res.data)
            console.log(res)
        })
        .catch((err) => (
            console.log(err)
        ))
        console.log('haha')
    }, []);
    const handleDelete = (e) => {
        e.preventDefault()
        const index = e.target.getAttribute('keys')
        const newData = [...reviewData]
        newData.splice(index, 1)
        setReviewData(newData)
    }
    return(
        <div className='mt-3'>
            <div className='row'>
                <div className='col'>

                </div>
                <div className='col-4'>
                    <div className='row d-flex justify-content-between'>
                        <PageBackButton/>
                        <HomeButton/>
                    </div>
                    <div className='col'>
                        <h1 className='mx-auto'>My Reviews</h1>
                        {/* change with real data */}
                        <small className="text-muted">{reviewData.length} review</small>
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
                    <div className='d-flex justify-content-center mt-3'>
                        {/* <button type="button" className="btn btn-warning btn-sm">Load More...</button> */}
                        <LoadMoreButton url={'https://my.api.mockaroo.com/pastreview1234.json?key=3c15f680'} data={reviewData} setdata={setReviewData} />
                    </div>
                </div>
                <div className='col'>

                </div>
            </div>

        </div>
    )
}

export default PastReviewPage
