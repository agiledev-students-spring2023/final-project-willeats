import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import OrderCard from '../OrderCard/OrderCard';
import TopBar_Mprofile from '../topBar/TopBar-M-profile';

function RestaurantOrder() {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    function fetchData() {
      axios.get(`http://localhost:3001/getRestaurantOrder/${id}`)
        .then(response => {      
          setOrders(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }

    fetchData();
  }, []);
  console.log(orders)
  if (orders.length === 0) {
    return (
      <div>
        <h3>No orders yet</h3>
      </div>
    );
  }

  return (
    <div>
     <TopBar_Mprofile></TopBar_Mprofile>
      {orders.map(order => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}

export default RestaurantOrder;

