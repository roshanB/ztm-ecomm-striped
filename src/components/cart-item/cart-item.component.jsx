import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <div className='cart-item'>
    <img src={imageUrl} alt='item' />
    <div className='item-details'>
      <span className='name'>{name}</span>
      <span className='price'>
        {quantity} x ${price}
      </span>
    </div>
  </div>
);

// Tried_use_of_memo - 
// CartItem was re-rendering in cart-dropdown even if same item was added to cart (only quantity change)
// now CartItem would not re-render in cart-dropdown if only quantity is changed (same item added)
export default React.memo(CartItem);
