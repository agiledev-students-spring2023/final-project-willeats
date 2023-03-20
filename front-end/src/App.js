import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Cart from './components/cart/Cart'
import OrderFinished from './OrderFinished'

const config = {
  cartItems: [
    {
      id: 1,
      name: "Cheeseburger",
      price: 8.99,
      quantity: 2,
    },
    {
      id: 2,
      name: "Fries",
      price: 3.99,
      quantity: 1,
    },
  ],
  deliveryFee: 2.99,
  taxRate: 0.1,
};

function App() {
  return (
      <Cart config={config} />
      
  );
}



export default App;
