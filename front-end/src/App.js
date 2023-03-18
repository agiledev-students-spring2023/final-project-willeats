import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './Home'
import PastReviewPage from './components/pastReview/pastReviewPage';
import EditReviewPage from './components/editReview/editReviewPage'
import CreateReviewPage from './components/createReview/createReviewPage';
import PastOrderPage from './components/pastOrder/pastOrderPage';
function App() {
  return (
      <Router>
        {/* <Routes>
          <Route path='/' element={<Home/>} />
        </Routes> */}
        <Routes>
          <Route path='/' element={<PastReviewPage/>} />
          <Route path='/edit' element={<EditReviewPage/>}/>
          <Route path='/create'element={<CreateReviewPage/>} />
          <Route path='/pastOrder' element={<PastOrderPage/>} />
        </Routes>
      </Router>
  );
}



export default App;
