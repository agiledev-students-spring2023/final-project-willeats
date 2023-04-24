import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate } from "react-router-dom";
import '../../bootstrap.css'
import ReviewArea from '../reviewArea/reviewArea';
import './createReviewPage.css'
import PageBackButton from '../pagebackButton/PageBackButton'; 
import axios from 'axios'

function CreateReviewPage(){
    const navigate = useNavigate()
    const location = useLocation()
    const [itemList, setItemList] = useState(new URLSearchParams(location.search).getAll('item'))
    const [reviewed, setReviewed] = useState([])
    const [saveData, setSaveData] = useState([])
    const [save, setSave] = useState(false)
    const [total,setTotal] = useState(0);
    const handlesave = () => {
        setSave(true)
    }

    useEffect(() => {
        if(save && saveData.length === reviewed.length){
            const token = localStorage.getItem("token")
            console.log(saveData)
            console.log(save)
            const request = []
            reviewed.forEach((ele, i) => {
                console.log(saveData[i].image)
                const formData = new FormData()
                formData.append("itemName", ele)
                formData.append("rating", saveData[i].rating)
                formData.append ("review", saveData[i].review)
                // formData.append("token", )
                // formData.append("date", saveData[i].date)
                saveData[i].image.forEach((e) => {
                    formData.append("image", e)
                })
                const newRequest = axios.post("http://localhost:3001/createuserreview", formData, {
                    headers: {
                        Authorization : token
                    }
                      
                })
                request.push(newRequest)
            })
            axios.all(request)
            .then(axios.spread((...res) => {
                setSave(false)
                navigate(-1)
            }))
            .catch(err => {
                console.log(err)
            })
            // axios.post("http://localhost:3001/createuserreview", formData)
            //         .then((res) => {
            //             console.log(res.data.message)
            //             if(i == reviewed.length - 1){
            //                 navigate(-1)
            //                 setSave(false)
            //             }
            //         })
            //         .catch((err) => {
            //             console.log(err)
            //         })
        }
    },[saveData]);

    // useEffect(() => {
    //     console.log(total)
    //     console.log(reviewed.length)
    //     if(save && total == reviewed.length){
    //         setSave(false)
    //         navigate(-1)
    //     }
    // }, [total])

    useEffect(()=>{
        if(reviewed.length === 0){
            setReviewed([itemList[0]])
            let newItemList = [...itemList]
           
            newItemList.splice(0, 1)
            setItemList(newItemList)
           
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
        
        setItemList(newItemList)
        setReviewed(newReviewed)
    }

    const handleAddMore = (e) => {
        
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
        <div className='mt-1'>
            <div className='row'>

                <div className='col'>
                    <div className='col'>
                        <PageBackButton />
                        <p className='fs-3 m-1'>Write a review for...</p>
                        <h1 className='fw-bolder m-1'>{new URLSearchParams(location.search).get('mainName')}</h1>
                        
                    </div>
                    <div className='row-gap-3'>
                        {reviewed.length > 0 && reviewed.map((e, index) => (
                            <div key={e}>
                                <select className='btn btn-primary dropdown-toggle m-1' 
                                    id='dropdown' 
                                    value={e} 
                                    onChange={handleClick} 
                                    key={index} 
                                    keys={index}>
                                    <option className='dropdown-item' value={e} key={e}>{e}</option>
                                    {itemList.map((ele, i) => (
                                        <option className='dropdown-item' value={ele} key={i}>{ele}</option>
                                    ))}
                                    
                                </select>
                                <ReviewArea 
                                    name={e} 
                                    i={index}
                                    key={e}
                                    save={save}
                                    total={total}
                                    setTotal={setTotal}
                                    setSaveData={setSaveData} />
                            </div>
                        ))}
                       
                    </div>
                    <div className='d-flex justify-content-end mt-3'>
                        {itemList.length > 0 && <button type="button" className="btn btn-warning btn-sm m-1" onClick={handleAddMore}>Add review</button>}
                        {reviewed.length > 1 && <button type="button" className="btn btn-danger btn-sm m-1" onClick={handleDelete}>Delete review</button>}
                    </div>
                    <div className='d-grid gap-2 col-5 mx-auto mt-3'>
                        {/* handle save */}
                        <button type="button" className="btn btn-primary" onClick={handlesave} disabled={save}>Submit</button> 
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CreateReviewPage