// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// function EditMenuItemPage() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState('');

//   // fetch the menu item data from the server using the id
//   // and set the state variables accordingly
//   // (assuming the server API returns JSON data)
//   useEffect(() => {
//     fetch(`/api/menu-items/${id}`)
//       .then(response => response.json())
//       .then(data => {
//         setName(data.name);
//         setPrice(data.price);
//         setDescription(data.description);
//         setImage(data.image);
//       })
//       .catch(error => {
//         console.error('Error fetching menu item data:', error);
//       });
//   }, [id]);

//   const handleSave = () => {
//     // handle save functionality here
//     // (e.g. submit a PUT request to the server to update the menu item)
//     navigate('/menu'); // redirect back to the menu page after saving
//   };

//   const handleCancel = () => {
//     navigate(-1); // go back to the previous page (assuming it was the menu page)
//   };

//   return (
//     <div className="edit-menu-item-page">
//       <h1>Edit Menu Item</h1>
//       <form>
//         <div className="form-group">
//           <label htmlFor="name-input">Name</label>
//           <input id="name-input" type="text" value={name} onChange={e => setName(e.target.value)} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="price-input">Price</label>
//           <input id="price-input" type="text" value={price} onChange={e => setPrice(e.target.value)} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description-input">Description</label>
//           <textarea id="description-input" value={description} onChange={e => setDescription(e.target.value)} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="image-input">Image URL</label>
//           <input id="image-input" type="text" value={image} onChange={e => setImage(e.target.value)} />
//         </div>
//         <div className="form-buttons">
//           <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
//           <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default EditMenuItemPage;
// import React, { useState, useEffect } from 'react';
// import SimpleImageSlider from 'react-simple-image-slider';
// import '../bootstrap.css';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Editor } from '@tinymce/tinymce-react';

// function EditMenuItemPage() {
//   const navigate = useNavigate();
//   const { itemId } = useParams();
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState([]);

//   // fetch the menu item data from the server using the id
//   // and set the state variables accordingly
//   // (assuming the server API returns JSON data)
//   useEffect(() => {
//     fetch(`/api/menu-items/${itemId}`)
//       .then(response => response.json())
//       .then(data => {
//         setName(data.name);
//         setPrice(data.price);
//         setDescription(data.description);
//         setImages(data.images);
//       })
//       .catch(error => {
//         console.error('Error fetching menu item data:', error);
//       });
//   }, [itemId]);

//   const handleNameChange = (content, editor) => {
//     setName(content);
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
//     navigate('/menu'); // redirect back to the menu page after saving
//   };

//   return (
//     <div className="edit-specified-item-page">
//       <SimpleImageSlider
//         width={500}
//         height={200}
//         images={images.map(image => ({ url: image }))}
//         showBullets={false}
//         showNavs={false}
//       />
//       <div className="edit-image-button">
//         <button className="btn btn-primary btn-sm">Edit Images</button>
//       </div>
//       <div className="edit-name">
//         <h3 className="highlighted-name" contentEditable="true" suppressContentEditableWarning={true} onBlur={handleNameChange}>
//           {name}
//         </h3>
//       </div>
//       <div className="edit-description">
//         <h2>Description</h2>
//         <Editor
//           initialValue={description}
//           apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
//           init={{
//             height: 200,
//             menubar: false,
//             plugins: [
//               'advlist autolink lists link image',
//               'charmap print preview anchor help',
//               'searchreplace visualblocks code',
//               'insertdatetime media table paste wordcount'
//             ],
//             toolbar:
//               'undo redo | formatselect | bold italic | \
//               alignleft aligncenter alignright | \
//               bullist numlist outdent indent | help'
//           }}
//           onEditorChange={handleDescriptionChange}
//         />
//       </div>
//       <div className="edit-price">
//         <h2>Price</h2>
//         <input type="text" className="form-control rounded-pill" value={price} onChange={handlePriceChange} />
//       </div>
//       <div className="edit-buttons">
//         <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
//         <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
//       </div>
//     </div>
//   );
// }

// export default EditMenuItemPage
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";
import './EditSpecifiedItem.css';
import '../bootstrap.css';

function EditSpecifiedItem() {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
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

  const handleDescriptionChange = (content, editor) => {
    setDescription(content);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSave = () => {
    // handle save functionality here
    // (e.g. submit a PUT request to the server to update the menu item)
    navigate('/edit'); // redirect back to the menu page after saving
  };

  return (
    <div className="edit-specified-item-container">
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
        <h2>Name</h2>
        <h1 onClick={() => {document.getElementById('name-editor').focus()}}>{name}</h1>
        <input id="name-editor" type="text" value={name} onChange={handleNameChange} style={{ display: 'inline-block' }} />
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
        <button className="btn btn-primary btn-lg btn-block" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default EditSpecifiedItem;
