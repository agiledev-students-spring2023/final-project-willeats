import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './CartIcon.css';

function CartIcon({ count,id}) {
  return (
    <div className="cart-icon-container">
      <Link to={"/cart/"+ id} className="cart-icon-link">
        <FontAwesomeIcon icon={faShoppingCart} size="3x" />
        {count > 0 && <div className="cart-count">{count}</div>}
      </Link>
    </div>
  );
}

export default CartIcon;
