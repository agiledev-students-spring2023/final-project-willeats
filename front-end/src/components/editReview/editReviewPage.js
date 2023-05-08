import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate } from "react-router-dom";
import '../../bootstrap.css'
import ReviewArea from '../reviewArea/reviewArea.js'
import TopBar from '../topBar/TopBar'

import axios from '../axiosConfig';
function EditReviewPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const [saveData, setSaveData] = useState([])
    const [save, setSave] = useState(false)
    const configuration = {
        method: "post",
        url: "/edituserreview",
        data: {
            saveData : saveData
        },
    };
    const handlesave = () => {
        setSave(true)
    }

    useEffect(() => {
        if(save && saveData){
            const token = localStorage.getItem("token")
            saveData[0].itemName = new URLSearchParams(location.search).get('itemName')
            const returnObject = saveData[0]
            const formData = new FormData()
            formData.append("rating", returnObject.rating)
            formData.append("review", returnObject.review)
            formData.append("preimage", JSON.stringify(returnObject.preimage))
            formData.append("id", new URLSearchParams(location.search).get('id'))
            returnObject.image.forEach((e) => {
                formData.append("image", e)
            })
            axios.post("/edituserreview", formData, {
                headers: {Authorization: `Bearer ${token}`}
            })
            .then((res) => {
                navigate(-1)
            })
            .catch((err) => {
                console.log(err)
                setSave(false)
                alert(err.response.data)
            })
            // axios(configuration)
            // .then((res) =>{
            //     console.log(res.data.message)
            //     setSave(false)
            //     navigate(-1)//add pop up 
            // })
            // .catch((err) =>{
            //     console.log(err)
            // })
        }
    },[saveData]);

    return(
        <div className='mt-1'>
            <div className='row'>
                <TopBar />
                <div className='col'>
                    <p className='fs-3 m-1'>Edit the review for...</p>
                    <h1 className='m-1 fw-bold'>{new URLSearchParams(location.search).get('mainName')}</h1>
                    <p className='fs-4 m-1'>{new URLSearchParams(location.search).get('itemName')}</p>
                    <ReviewArea name={new URLSearchParams(location.search).get('itemName')} 
                                review={new URLSearchParams(location.search).get('review')} 
                                image={new URLSearchParams(location.search).getAll('image')} 
                                save={save}
                                setSaveData={setSaveData}
                                saveData={saveData}
                                setSave={setSave} />
                    <div className='d-grid gap-2 col-5 mx-auto mt-3'>
                        {/* handle save */}
                        <button type="button" className="btn btn-primary" onClick={handlesave} disabled={save} >Save</button> 
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditReviewPage