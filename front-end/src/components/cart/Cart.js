import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../../bootstrap.css'
import TopBar from '../topBar/TopBar';
import './cart.css';
import axios from '../axiosConfig';



const Cart = ({}) => {

  
  const Navigate = useNavigate()
  const [tipAmount, setTipAmount] = useState(0);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [restaurantId, setRestaurantId]=useState('6444893a4f71daabbde15f35')
  const [rateData, setRateData] = useState([])
  const [taxRate,setTaxRate] = useState(8.875)
  const { id } = useParams();
  const handleTipChange = (event) => {
    setTipAmount(parseFloat(event.target.value));
  };

  const navigate = useNavigate()

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
      const total = itemsWithQuantities.reduce((acc, item) => acc + item.quantity * item.price, 0)
      
      setTotalPrice(total);
    }
  }, []);
  
const handleLCheckout = () => {
  const token = localStorage.getItem("token")
  console.log((totalPrice+tipAmount+totalPrice*taxRate/100).toFixed(2))
  const configuration = {
    method: "post",
    headers: {Authorization: `Bearer ${token}`},
    url: `/checkout/${id}`,
    data: {
        totalPrice: (totalPrice+tipAmount+totalPrice*taxRate/100).toFixed(2),
        items: items
    },
};
  axios(configuration)
  .then(res => {
    Navigate('/checkout')
  })
  .catch((err) => {
    console.log(err)
    alert('check out failed')
  })
  
}

const handleTipKeyDown = (event) => {
  if (event.key === '-' || event.key === 'e') {
    event.preventDefault();
  }
};

 
const subtotal=items.reduce((acc, item) => acc + item.price * item.quantity, 0)

const tax = subtotal * taxRate/100;
const total = subtotal + tax  + tipAmount;

const tipPercentages = [10, 15, 20];

 
  
  return (
    <div className="cart-overlay">
        <TopBar /> 
      
      <div className="cart">
        <h5>Your Cart</h5>  
        {items.map((item) => (
          <div class="cart-list" key={item.id}>
            <p>{item.name} x {item.quantity}</p>
            <p>${(item.price*item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="subtotal">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax: ${tax.toFixed(2)}</p>

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
                inputMode="decimal"
                className="tip-input"
                min="0"
                onChange={handleTipChange}
                onKeyDown={handleTipKeyDown}
                placeholder='0.00'
              /> 

            </div>
            <span>{(tipAmount/subtotal*100).toFixed(1)}%</span>
          
        
          <p>Total: ${total.toFixed(2)}</p>
        
          <button className="button btn btn-primary btn-lg"  onClick={handleLCheckout} disabled={items.length === 0}>Place The Order</button>
        
        </div>
      </div>
    </div>
  );
};

export default Cart;
