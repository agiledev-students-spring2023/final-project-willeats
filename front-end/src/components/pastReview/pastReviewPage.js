import {React, useState, useEffect} from 'react'
import {useNavigate, Link} from "react-router-dom";
import ReviewCard from '../reviewCards/reviewCard.jsx'
import axios from '../axiosConfig';
import '../../bootstrap.css'
import LoadMoreButton from '../loadMoreButton/loadMoreButton';
import TopBar from '../topBar/TopBar.js';
function PastReviewPage() {

    const [reviewData, setReviewData] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get('/userpastreview', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((res) => {
            setReviewData(res.data)
        })
        .catch((err) => (
            console.log(err)
        ))
    }, []);
    const handleDelete = (e) => {
        e.stopPropagation()
        const token = localStorage.getItem("token")
        const configuration = {
            method: "post",
            url: "/deleteuserreview",
            headers: {Authorization: `Bearer ${token}`},
            data: {
                id : e.target.getAttribute('id')
            }
        };
        axios(configuration)
        .then((res) => {
            const index = e.target.getAttribute('keys')
            const newData = [...reviewData]
            newData.splice(index, 1)
            setReviewData(newData)
        })
        .catch((err) => {
            console.log(err)
        })
        
    }
    return(
        <div className='mt-1 mw-40'>
            <div className='row'>

                <div className='col'>
                    <TopBar />
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
                                id={element.reviewId}
                                date={element.date} 
                                star={element.star}
                                image={element.avatar}
                                reviewImage={element.reviewImage}
                                handleDelete={handleDelete}
                                isUser={element.isUser} />
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
