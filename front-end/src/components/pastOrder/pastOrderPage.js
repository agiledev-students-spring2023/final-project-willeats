import {React, useState, useEffect} from 'react'
import {useNavigate } from "react-router-dom";
import '../../bootstrap.css'
import ReviewCard from '../reviewCards/reviewCard';
import './pastOrderPage.css'
import axios from 'axios';
import LoadMoreButton from '../loadMoreButton/loadMoreButton';
import PageBackButton from '../pagebackButton/PageBackButton';
function PastOrderPage(props){
    const navigate = useNavigate()
    const [reviewData, setReviewData] = useState([])

    useEffect(() => {
        axios.get('https://my.api.mockaroo.com/userorder123123.json?key=d124d270')
        .then((res) => {
            setReviewData(res.data)
            console.log(res)
        })
        .catch((err) => (
            console.log(err)
        ))
    }, []);

    const CreateButton = (props) => {
        const handleCreate = () => {
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
        <div className='mt-3'>
            <div className='row'>
                <div className='col'>

                </div>
                <div className='col-4'>
                    <div className='row d-flex justify-content-between'>
                        <PageBackButton/>
                    </div>
                    <div className='col'>
                        <h1 className='mx-auto'>My Orders</h1>
                        {/* change with real data */}
                        {reviewData && <small className="text-muted">{ reviewData.length} orders</small>}
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
                    <div className='d-flex justify-content-center mt-3'>
                        {/* <button type="button" className="btn btn-warning btn-sm">Load More...</button> */}
                        <LoadMoreButton url={'https://my.api.mockaroo.com/userorder123123.json?key=d124d270'} data={reviewData} setdata={setReviewData} />
                    </div>
                </div>
                <div className='col'>

                </div>
            </div>

        </div>
    )
}

export default PastOrderPage