import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../../bootstrap.css'
import TopBar from '../topBar/TopBar';
import './cart.css'
import axios from 'axios';
import HomeButton from '../profile/HomeButton';
import PageBackButton from '../pagebackButton/PageBackButton';





const Cart = ({}) => {

  
  const Navigate = useNavigate()
  const [tipAmount, setTipAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [taxRate, setTaxRate] = useState(0);

  const handleTipChange = (event) => {
    setTipAmount(parseFloat(event.target.value));
  };

  const navigate = useNavigate()

  const navigateHome = () => {
    navigate('/')
  }

  // const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // const tax = subtotal * taxRate;
  // const total = subtotal + tax + deliveryFee + tipAmount;

  useEffect(() => {
    axios.get('https://my.api.mockaroo.com/cart_items.json?key=63c46330')
    .then((res) => {
        console.log(res.data)
        setCartItems(res.data)
    })
    .catch((err) => (
      console.log(err)
    ))    
}, []);

useEffect(() => {
  axios.get('https://my.api.mockaroo.com/resdata.json?key=63c46330')
  .then((res) => {
    console.log(res.data)

    setDeliveryFee(res.data.deliveryFee)
    setTaxRate(res.data.taxrate)
  })
  .catch((err) => (
      console.log(err)
  ))
}, []);

const handleLCheckout = () => {
  Navigate('/checkout')
}

 
const subtotal=cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

const tax = subtotal * taxRate/100;
const total = subtotal + tax + deliveryFee + tipAmount;

  const tipPercentages = [10, 15, 20];

 
  
  return (
    <div className="cart-overlay">
        <div className='row d-flex justify-content-between m-1'>
            <PageBackButton />
            <HomeButton />
          </div>      
      
      <div className="cart">
        <h5>Your Cart</h5>
        {cartItems.map((item) => (
          <div class="cart-list" key={item.id}>
            <p>{item.name} x {item.quantity}</p>
            <p>${(item.price*item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="subtotal">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
          <p>Delivery Fee: ${deliveryFee.toFixed(2)}</p>

          <span>Tip</span>

            <div className="tip-container">
              <div className='percentages'>
              {tipPercentages.map((tipPercentage) => (
                <button
                  key={tipPercentage}
                  className="tip-button btn btn-primary"
                  onClick={() => setTipAmount((subtotal * tipPercentage) / 100)}
                >
                  {tipPercentage}%
                </button>
              ))}
              </div>
              <input
                type="number"
                className="tip-input"
                min="0"
                step="0.01"
                value={tipAmount}
                onChange={handleTipChange}
              /> 

            </div>
            <span>{(tipAmount/subtotal*100).toFixed(1)}%</span>
          
        
          <p>Total: ${total.toFixed(2)}</p>
        
          <button className="button btn btn-primary btn-lg"  onClick={handleLCheckout}>Checkout</button>
        
        </div>
      </div>
    </div>
  );
};

export default Cart;
