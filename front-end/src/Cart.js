import React, { useState } from 'react';
import './bootstrap.css'
import './cart.css'


/*
Structue of config 

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
*/

const Cart = ({ config }) => {
  const cartItems = config.cartItems;
  const taxRate = config.taxRate;
  const deliveryFee = config.deliveryFee;

  const [tipAmount, setTipAmount] = useState(0);

  const handleTipChange = (event) => {
    setTipAmount(parseFloat(event.target.value));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax + deliveryFee + tipAmount;

  const tipPercentages = [10, 15, 20];


  return (
    <div className="cart-overlay">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
</svg>
      <div className="cart">
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
        
          <button className="button btn btn-primary btn-lg">Checkout</button>
        
        </div>
      </div>
    </div>
  );
};

export default Cart;
