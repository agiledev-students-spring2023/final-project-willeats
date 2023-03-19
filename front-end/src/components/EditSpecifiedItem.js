// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import SimpleImageSlider from "react-simple-image-slider";
// import './EditSpecifiedItem.css';
// import '../bootstrap.css';

// function EditSpecifiedItem() {
//   const navigate = useNavigate();
//   const { itemId } = useParams();
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [images, setImages] = useState([
//     "https://picsum.photos/id/100/500/200",
//     "https://picsum.photos/id/101/500/200",
//     "https://picsum.photos/id/102/500/200",
//   ]);
  
//   //fetch menu item data from the server using the id
//   useEffect(() => {
//     fetch(`/api/menu-items/${itemId}`)
//       .then(response => response.json())
//       .then(data => {
//         setName(data.name);
//         setDescription(data.description);
//         setPrice(data.price);
//         setImages(data.images);
//       })
//       .catch(error => {
//         console.error('Error fetching menu item data:', error);
//       });
//   }, [itemId]);

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleDescriptionChange = (content, editor) => {
//     setDescription(content);
//   };

//   const handlePriceChange = (event) => {
//     setPrice(event.target.value);
//   };

//   const handleSave = () => {
//     // handle save functionality here
//     // (e.g. submit a PUT request to the server to update the menu item)
//     navigate('/edit'); // redirect back to the menu page after saving
//   };

//   return (
//     <div className="edit-specified-item-container">
//       <div className="image-slider-container">
//         <SimpleImageSlider
//           width={500}
//           height={200}
//           images={images.map(image => ({ url: image }))}
//           navStyle={1}
//           showNavs={true}
//           useGPURender={true}
//           slideDuration={0.5}
//           navWidth={60}
//           navHeight={10}
//           onClickNav={(index) => console.log(`Clicked nav button: ${index}`)}
//         />
//         <button className="edit-images-button">Edit the Images</button>
//       </div>

//       <div className="name-container">
//         <h2>Name</h2>
//         <h1 onClick={() => {document.getElementById('name-editor').focus()}}>{name}</h1>
//         <input id="name-editor" type="text" value={name} onChange={handleNameChange} style={{ display: 'inline-block' }} />
//       </div>

//       <div className="description-container">
//         <h2>Description</h2>
//         <textarea id="description-editor" value={description} onChange={handleDescriptionChange} className="description-editor" />
//       </div>

//       <div className="price-container">
//         <h2>Price</h2>
//         <input type="text" value={price} onChange={handlePriceChange} className="price-editor" />
//       </div>

//       <div className="save-button-container">
//         <button className="btn btn-primary save-button" onClick={handleSave}>Save</button>
//       </div>
//     </div>
//   );
// }

// export default EditSpecifiedItem;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";
import './EditSpecifiedItem.css';
import '../bootstrap.css';

function EditSpecifiedItem() {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [name, setName] = useState('Hot Pot');
  const [description, setDescription] = useState('Hot pot, also known as Chinese fondue or steamboat, is a popular Chinese cooking method that involves cooking raw ingredients in a simmering pot of soup.');
  const [price, setPrice] = useState('$30');
  const [images, setImages] = useState([
    "https://picsum.photos/id/100/500/200",
    "https://picsum.photos/id/101/500/200",
    "https://picsum.photos/id/102/500/200",
  ]);
  
  //fetch menu item data from the server using the id
  useEffect(() => {
    fetch(`/api/menu-items/${itemId}`)
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setImages(data.images);
      })
      .catch(error => {
        console.error('Error fetching menu item data:', error);
      });
  }, [itemId]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSave = () => {
    // handle save functionality here
    // (e.g. submit a PUT request to the server to update the menu item)
    navigate('/edit'); // redirect back to the menu page after saving
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
    <div className="edit-specified-item-container justify-content-center">
      <div className="image-slider-container">
        <SimpleImageSlider
          width={500}
          height={200}
          images={images.map(image => ({ url: image }))}
          navStyle={1}
          showNavs={true}
          useGPURender={true}
          slideDuration={0.5}
          navWidth={60}
          navHeight={10}
          onClickNav={(index) => console.log(`Clicked nav button: ${index}`)}
        />
        <button className="edit-images-button">Edit the Images</button>
      </div>

      <div className="name-container">
        <h1 id="name" onClick={handleNameClick}>{name}</h1>
        <input id="name-editor" type="text" value={name} onChange={handleNameChange} onBlur={handleNameBlur} style={{ display: 'none' }} />
      </div>

      <div className="description-container">
        <h2>Description</h2>
        <textarea id="description-editor" value={description} onChange={handleDescriptionChange} className="description-editor" />
      </div>

      <div className="price-container">
        <h2>Price</h2>
        <input type="text" value={price} onChange={handlePriceChange} className="price-editor" />
      </div>

      <div className="save-button-container">
        <button className="btn btn-primary save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default EditSpecifiedItem;