import React, { useState, useEffect } from 'react';
import './Cart.css';
import '../bootstrap.css'
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/menu');
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
      const itemQuantities = {};
      cartItems.forEach(item => {
        const itemName = item.name;
        if (itemQuantities[itemName]) {
          itemQuantities[itemName] += 1;
        } else {
          itemQuantities[itemName] = 1;
        }
      });
      const itemsWithQuantities = Object.entries(itemQuantities).map(([name, quantity]) => {
        const item = cartItems.find(item => item.name === name);
        const price = parseFloat(item.price.replace('$', ''));
        return {
          name: name,
          quantity: quantity,
          price: price,
        };
      });
      setItems(itemsWithQuantities);
      const total = itemsWithQuantities.reduce((acc, item) => acc + item.quantity * item.price, 0);
      setTotalPrice(total);
    }
  }, []);

  const renderTableRows = () => {
    return items.map((item, index) => (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    ));
  };

  return (
    <div className='row'>
    <div className='col-4'></div>
    <div className='col-4'>
    <div className="cart-container">
      <div className='goback'><button onClick={handleGoBack}>X</button></div>
      <h1>Your Cart</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">SubTotal:</td>
            <td>${totalPrice.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <div className="tip-column">
      <span>Tip: </span>
        <button className="btn btn-primary">5%</button>
        <button className="btn btn-primary">10%</button>
        <button className="btn btn-primary">15%</button>
      </div>
      <button className="checkout-button">Checkout</button>
    </div>
    </div>
    <div className='col-4'></div>
    </div>
    );
}

export default Cart;

