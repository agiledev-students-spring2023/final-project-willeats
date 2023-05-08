import {React, useState, useEffect} from 'react'
import {useNavigate } from "react-router-dom";
import '../../bootstrap.css'
import ReviewCard from '../reviewCards/reviewCard';
import './pastOrderPage.css'
import axios from '../axiosConfig';

import HomeButton from '../profile/HomeButton';
import TopBar from '../topBar/TopBar.js';
function PastOrderPage(props){
    const navigate = useNavigate()
    const [reviewData, setReviewData] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get('/userpastorder',{
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((res) => {
            console.log(res.data[0])
            setReviewData(res.data)
            console.log(res.data)
        })
        .catch((err) => (
            console.log(err)
        ))
    }, []);

    const CreateButton = (props) => {

        const handleCreate = (e) => {
            e.stopPropagation();
            const params = new URLSearchParams()
            params.append('mainName', props.mainName)
            props.itemList.map((e) => (
                params.append('item', e)
            ))
            navigate({pathname:'/usercreatereview', search: params.toString() })
        }
        return(
            <button type="button" className="btn btn-primary mb-1 mt-0" onClick={handleCreate}>Write my reviews</button>
        )
    }
    return(
        <div className='mt-1'>
            <div className='row'>

                <div className='col'>
                    <TopBar/>
                    <div className='col'>
                        <h1 className='m-1'>My Orders</h1>

                        {reviewData && <small className="text-muted m-1">{reviewData.length} orders</small>}
                    </div>
                    <div className='row-gap-3'>
                        {reviewData != null && reviewData.map((element) => (
                            <ReviewCard
                                order={true}
                                mainName={element.name}
                                key={element.id + element.name}
                                itemList={element.itemList}
                                date={element.date}
                                totalPrice = {element.totalPrice}
                                id = {element.id.slice(-4)}
                                CreateButton={CreateButton}
                                image={element.avatar} />
                        ))}
                    </div>

                    {/* <div className='d-flex justify-content-center mt-2'>
                        
                        {reviewData.length > 0 && <LoadMoreButton url={'http://localhost:3001/userpastorder'} data={reviewData} setdata={setReviewData} />}

                    </div> */}
                </div>

            </div>

        </div>
    )
}

export default PastOrderPage