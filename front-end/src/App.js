import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Home'
import CustomerProfile from './components/CustomerProfile/CustomerProfile';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/CP" element={<CustomerProfile/>}></Route>
    </Routes>
  </Router>
  );
}



export default App;
