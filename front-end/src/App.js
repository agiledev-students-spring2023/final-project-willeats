import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import defaultProfileImg from "./image/default-profile-image.svg";


import React from 'react';
import ReviewDetails from './ReviewDetails';

const review = {
  reviewerId: '1',
  rating: 4,
  date: 'March 18, 2023',
  content: 'I absolutely love this product. It exceeded my expectations and is the best thing I have ever bought. Highly recommend!',
  images: [
    {
      url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80',
      altText: 'Product image 1',
    },
    {
      url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80',
      altText: 'Product image 2',
    },
    {
      url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80',
      altText: 'Product image 3',
    },
  ],
};

const user= {
  id:'1',
  name:'John Doe',
  profileImage: defaultProfileImg
}


function App() {
  return (
    <ReviewDetails review={review} user={user} />
  );
}

export default App;
