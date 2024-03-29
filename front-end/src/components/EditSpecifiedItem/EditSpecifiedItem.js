import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";
import './EditSpecifiedItem.css';
import '../../bootstrap.css';

import axios from '../axiosConfig';
import TopBar_profile from '../topBar/TopBar-profile';


function EditSpecifiedItem() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams();
  const [name, setName] = useState(new URLSearchParams(location.search).get('name'));
  const [description, setDescription] = useState(new URLSearchParams(location.search).get('description'));
  const [price, setPrice] = useState(new URLSearchParams(location.search).get('price'));
  const [id, setId] = useState(new URLSearchParams(location.search).get('id'));
  const [type,setType]=useState(new URLSearchParams(location.search).get('type'))
  const [images, setImages] = useState(
    new URLSearchParams(location.search).get('image')
      ? new URLSearchParams(location.search).get('image').split(',')
      : ["https://willeats-bucket.s3.us-east-1.amazonaws.com/1682783282361-07127035755.0.jpg"]
  );
  // console.log(id)
  //fetch menu item data from the server using the id
  const [newImages, setNewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.addEventListener('change', (event) => {
      const files = event.target.files;
      const urls = [];
    
      for (let i = 0; i < files.length; i++) {
        const url = URL.createObjectURL(files[i]);
        urls.push(url);
      }
      console.log(urls)
      setImages(urls);
      setImageFiles(files);
    });
    input.click();
    
  }

  console.log(images)

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSave = () => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('price', price);
    data.append('type', type);
    for (let i = 0; i < imageFiles.length; i++) {
      data.append(`images[${i}]`, imageFiles[i]);
    }
  
    const token = localStorage.getItem('token');
    
    axios.post(`/api/edit-menu-items/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response.data);
        navigate('/editmenu'); // redirect back to the menu page after saving
      })
      .catch(error => {
        console.log(error)
        alert('Error saving changes: ' + error.response.data.error);
      });
  };
  


  const handleNameClick = () => {
    const nameElement = document.getElementById('name');
    nameElement.style.display = 'none';
    const nameEditor = document.getElementById('name-editor');
    nameEditor.style.display = 'block';
    nameEditor.focus();
  };

  const handleNameBlur = () => {
    const nameEditor = document.getElementById('name-editor');
    nameEditor.style.display = 'none';
    const nameElement = document.getElementById('name');
    nameElement.style.display = 'block';
  };

  return (
    <div>
      <TopBar_profile />
      <div className="edit-specified-item-container">

        <div className="image-slider-container">
          <SimpleImageSlider
            key={images.join("")}
            width={'90%'}
            height={200}
            images={images.map(image => ({ url: image }))}
            navStyle={1}
            useGPURender={true}
            slideDuration={0.5}
            navWidth={60}
            navHeight={10}
            bgColor={'fff'}
            onClickNav={(index) => console.log(`Clicked nav button: ${index}`)}
            onClick={handleImageUpload}
          />
         
        </div>

        <div className="name-container">
          {/* <h1 id="name" onClick={handleNameClick}>{name}</h1> */}
          <input
            id="name-editor"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
            className="custom-name-input" // Add the custom class here
          />

        </div>

        <div className="description-container">
          <h2>Description</h2>
          <textarea id="description-editor" value={description} onChange={handleDescriptionChange} className="description-editor" />
        </div>

        <div className="price-container">
          <h2>Price</h2>
          <input type="text" value={price} onChange={handlePriceChange} className="price-editor" />
        </div>

        <div className="price-container">
          <h2>Type</h2>
          <input type="text" value={type} onChange={handleTypeChange} className="price-editor" />
        </div>

        <div className="save-button-container">
          <button className="btn btn-primary save-button-edit-specify" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditSpecifiedItem;