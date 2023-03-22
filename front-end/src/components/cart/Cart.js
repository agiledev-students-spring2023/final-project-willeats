import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../bootstrap.css'
import TopBar from '../topBar/TopBar';
import './cart.css'


const Cart = ({ config }) => {
  const cartItems = config.cartItems;
  const taxRate = config.taxRate;
  const deliveryFee = config.deliveryFee;

  const [tipAmount, setTipAmount] = useState(0);

  const handleTipChange = (event) => {
    setTipAmount(parseFloat(event.target.value));
  };

  const navigate = useNavigate()

  const navigateHome = () => {
    navigate('/')
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax + deliveryFee + tipAmount;

  const tipPercentages = [10, 15, 20];


  return (
    <div className="cart-overlay">
      <TopBar/>
      <div className="cart mt-4">
        <h5>Your Cart</h5>
        {cartItems.map((item) => (
          <div class="cart-list" key={item.id}>
            <p>{item.name} x {item.quantity}</p>
            <p>${item.price.toFixed(2)}</p>
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
              /> $

            </div>
            <span>{(tipAmount/subtotal*100).toFixed(1)}%</span>
          
        
          <p>Total: ${total.toFixed(2)}</p>
        
          <button className="button btn btn-primary btn-lg" onClick={navigateHome}>Checkout</button>
        
        </div>
      </div>
    </div>
  );
};

export default Cart;
