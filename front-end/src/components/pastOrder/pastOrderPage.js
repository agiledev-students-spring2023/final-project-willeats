import {React, useState, useEffect} from 'react'
import {useNavigate } from "react-router-dom";
import '../../bootstrap.css'
import ReviewCard from '../reviewCards/reviewCard';
import './pastOrderPage.css'
import axios from 'axios';
import LoadMoreButton from '../loadMoreButton/loadMoreButton';
import PageBackButton from '../pagebackButton/PageBackButton';
import HomeButton from '../profile/HomeButton';
function PastOrderPage(props){
    const navigate = useNavigate()
    const [reviewData, setReviewData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/userpastorder')
        .then((res) => {
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
                    <div className='d-flex justify-content-between'>
                        <PageBackButton />
                        <HomeButton />
                    </div>
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
                                CreateButton={CreateButton}
                                image={element.restImage} />
                        ))}
                    </div>

                    <div className='d-flex justify-content-center mt-2'>
                        
                        {reviewData.length > 0 && <LoadMoreButton url={'http://localhost:3001/userpastorder'} data={reviewData} setdata={setReviewData} />}

                    </div>
                </div>

            </div>

        </div>
    )
}

export default PastOrderPage