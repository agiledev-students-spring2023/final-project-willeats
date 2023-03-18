import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Home'
import Login from './login/Login';
import CustomerSignUp from './signUp/CustomerSignUp';
import ManagerSignUp from './signUp/ManagerSignUp';
import CustomerProfile from './Profile/CustomerProfile';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/Home' element={<Home/>}></Route>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Sign-C' element={<CustomerSignUp/>}></Route>
          <Route path='/Sign-M' element={<ManagerSignUp/>}></Route>
          <Route path='/Profile-C' element={<CustomerProfile/>}></Route>
        </Routes>
      </Router>
  );
}



export default App;
