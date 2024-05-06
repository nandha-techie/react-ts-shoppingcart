import { useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useShoppiongCart } from '../context/ShoppingCartContext';
import CartItem from './CartItem';
import storeItemsData from '../data/data.json';
import { formatCurrency } from '../utilities/formatCurrency'


type shoppingCartPros = {
    isOpen: boolean
}

const ShoppingCart = ({isOpen}: shoppingCartPros)=>{
    const {closeCart, cartItems } = useShoppiongCart();

    return(
        <>
            <Offcanvas show={isOpen} onHide={closeCart} placement="end">
                <Offcanvas.Header closeButton onClick={closeCart}>
                <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Stack gap={2}>
                        { cartItems.map(item => (
                            <CartItem key={item.id} {...item } />
                        ))}
                        <div className='ms-auto fw-bold fs-5'>
                        Total{": "}
                        {
                            formatCurrency(cartItems.reduce((total, cartItem) => {
                                    const item = storeItemsData.find(i => i.id === cartItem.id)
                                    return total + (item?.price || 0) * cartItem.quantity;
                                }, 0)
                            )
                        } 
                    </div>
                    </Stack>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
export default ShoppingCart;