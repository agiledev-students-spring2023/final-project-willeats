import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import {review, user, owner} from './config.js'

import React from 'react';
import OwnersideReviewDetails from './components/OwnerSideReviewDetails/OwnersideReviewDetails';
import ReviewDetails from './components/ReviewDetails/ReviewDetails';

function App() {
  return (
    <OwnersideReviewDetails review={review} user={user} owner={owner} />
    //  <ReviewDetails review={review} user={user} />
  )
}

export default App;
