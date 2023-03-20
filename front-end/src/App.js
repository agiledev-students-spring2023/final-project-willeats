import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './Home'
import PastReviewPage from './components/pastReview/pastReviewPage';
import EditReviewPage from './components/editReview/editReviewPage'
import CreateReviewPage from './components/createReview/createReviewPage';
import PastOrderPage from './components/pastOrder/pastOrderPage';
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/userpastreview' element={<PastReviewPage/>} />
          <Route path='/usereditreview' element={<EditReviewPage/>}/>
          <Route path='/usercreatereview' element={<CreateReviewPage/>} />
          <Route path='/userpastorder' element={<PastOrderPage/>} />
        </Routes>
      </BrowserRouter>
  );
}



export default App;
