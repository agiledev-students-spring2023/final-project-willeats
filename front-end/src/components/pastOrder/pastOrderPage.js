import React from 'react'
import {useNavigate } from "react-router-dom";
import '../../bootstrap.css'
import ReviewCard from '../reviewCards/reviewCard';
import './pastOrderPage.css'
function PastOrderPage(props){
    const navigate = useNavigate()
    const reviewData = [
        {
            'name' : 'Lao Ma Spicy', 
            'date' : '2020/1/3', 
            'itemList' : ['Spicy Hot Pot', 'Grilled Chicken Sandwich', 'Taco'],
            'id' : 1
        },
        {
            'name' : 'Lao Ma Spicy', 
            'date' : '2022/5/3', 
            'itemList' : ['Spicy Hot Pot'],
            'id' : 2
        },
        {
            'name' : 'Subway', 
            'date' : '2023/1/3', 
            'itemList' : ['Spicy Hot Pot', 'Grilled Chicken Sandwich', 'Taco'],
            'id' : 3
        }
    ]
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
                    <div className='col'>
                        <h1 className='mx-auto'>My Orders</h1>
                        {/* change with real data */}
                        <small className="text-muted">{reviewData.length} orders</small>
                    </div>
                    <div className='row-gap-3'>
                        {reviewData.map((element) => (
                            <ReviewCard 
                            order={true} 
                            mainName={element.name} 
                            key={element.id} 
                            itemList={element.itemList} 
                            date={element.date}
                            CreateButton={CreateButton} />
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

export default PastOrderPage