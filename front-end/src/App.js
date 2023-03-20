import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Home'
import Login from './components/login/Login';
import CustomerSignUp from './components/signUp/CustomerSignUp';
import ManagerSignUp from './components/signUp/ManagerSignUp';
import CustomerProfile from './components/profile/CustomerProfile';
import ManagerProfile from './components/profile/ManagerProfile';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/Sign-C' element={<CustomerSignUp/>}></Route>
          <Route path='/Sign-M' element={<ManagerSignUp/>}></Route>
          <Route path='/Profile-C' element={<CustomerProfile/>}></Route>
          <Route path='/Profile-M' element={<ManagerProfile/>}></Route>
        </Routes>
      </Router>
  );
}



export default App;
