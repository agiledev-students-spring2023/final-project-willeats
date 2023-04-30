import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useParams } from 'react-router-dom';
import OrderCard from '../OrderCard/OrderCard';
import TopBar_profile from '../topBar/TopBar-profile';

function RestaurantOrder() {
    const [orders, setOrders] = useState([]);
    const { id } = useParams();
  
    useEffect(() => {
      function fetchData() {
        axios.get(`/getRestaurantOrder/${id}`)
          .then(response => {      
            setOrders(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
      
      // Call fetchData() initially and every 5 seconds
      const intervalId = setInterval(fetchData, 10000);
      fetchData();
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [id]);
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
        <TopBar_profile></TopBar_profile>
        <h3>Orders...</h3>
        {orders.map(order => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    );
  }

export default RestaurantOrder;

