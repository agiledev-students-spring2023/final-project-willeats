import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import {review, user, owner} from './config.js'

import React from 'react';
import OwnersideReviewDetails from './OwnersideReviewDetails';

function App() {
  return (
    <OwnersideReviewDetails review={review} user={user} owner={owner} />
  );
}

export default App;
