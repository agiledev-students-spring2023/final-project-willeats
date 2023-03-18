import React, { useEffect, useState } from 'react'
import {useLocation } from "react-router-dom";
import '../../bootstrap.css'
import ReviewArea from '../reviewArea/reviewArea';
import './createReviewPage.css'
import PageBackButton from '../pagebackButton/PageBackButton'; 
function CreateReviewPage(){
    const location = useLocation()
    const [itemList, setItemList] = useState(new URLSearchParams(location.search).getAll('item'))
    const [reviewed, setReviewed] = useState([])
    useEffect(()=>{
        if(reviewed.length === 0){
            setReviewed([itemList[0]])
            let newItemList = [...itemList]
            console.log(newItemList)
            newItemList.splice(0, 1)
            setItemList(newItemList)
            console.log(newItemList)
        }
    },[itemList, reviewed.length])

    const handleClick = (e) => {
        const newReviewed = [...reviewed]
        const curReviewed = e.target.getAttribute('keys')
        const keys = e.target.value 
        const newItemList = [...itemList]
        newItemList.push(reviewed[curReviewed])
        newReviewed[curReviewed] = keys
        const index = itemList.indexOf(keys)
        newItemList.splice(index, 1)
        console.log(newItemList)
        setItemList(newItemList)
        setReviewed(newReviewed)
    }

    const handleAddMore = () => {
        const newReviewed = [...reviewed, itemList[0]]
        const newItemList = [...itemList]
        newItemList.splice(0,1)
        setItemList(newItemList)
        setReviewed(newReviewed)
    }

    const handleDelete = () => {
        const newReviewed = [...reviewed]
        const newItemList = [...itemList, reviewed[reviewed.length - 1]]
        newReviewed.splice(newReviewed.length - 1, 1)
        setItemList(newItemList)
        setReviewed(newReviewed)
    }

    return(
        <div className='mt-3'>
            <div className='row'>
                <div className='col'>
                    
                </div>
                <div className='col-4'>
                    <div className='col'>
                        <PageBackButton />
                        <h2 className='mx-auto'>Write a review for...</h2>
                        <h1 className='fw-bolder'>{new URLSearchParams(location.search).get('mainName')}</h1>
                        
                    </div>
                    <div className='row-gap-3'>
                        {reviewed.length > 0 && reviewed.map((e, index) => (
                            <div key={e}>
                                <select className='btn btn-primary dropdown-toggle mb-1 mt-1' 
                                    id='dropdown' 
                                    value={e} 
                                    onChange={handleClick} 
                                    key={index} 
                                    keys={index}>
                                    <option className='dropdown-item' value={e} key={e}>{e}</option>
                                    {itemList.map((ele, i) => (
                                        <option className='dropdown-item' value={ele} key={ele}>{ele}</option>
                                    ))}
                                    
                                </select>
                                <ReviewArea name={e} key={e}/>
                            </div>
                        ))}
                       
                    </div>
                    <div className='d-flex justify-content-end mt-3'>
                        {itemList.length > 0 && <button type="button" className="btn btn-warning btn-sm m-1" onClick={handleAddMore}>Add review</button>}
                        {reviewed.length > 1 && <button type="button" className="btn btn-danger btn-sm m-1" onClick={handleDelete}>Delete review</button>}
                    </div>
                </div>
                <div className='col'>

                </div>
            </div>

        </div>
    )
}

export default CreateReviewPage