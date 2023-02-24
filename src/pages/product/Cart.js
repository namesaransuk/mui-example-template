import React, { useState, useEffect } from 'react';
import './cart.css';
import Total from './components/Total';
import CartItem from './components/CartItem';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

function Cart() {
    const { cart } = useSelector((state) => state.menu);

    return (
        <div className="cart">
            <div className="cart__left">
                <div>
                    <h3>Shopping Cart</h3>
                    {cart?.map((item) => (
                        <CartItem
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            price={item.price}
                            quantity={item.quantity}
                        />
                    ))}
                </div>
            </div>

            <div className="cart__right">
                <Total />
            </div>
        </div>
    );
}

export default Cart;
