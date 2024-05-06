import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import storeItemsData from '../data/data.json';
import { useShoppiongCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency'

type CartItemProps = {
    id: number,
    quantity: number
}

const CartItem = ({id, quantity}: CartItemProps)=>{
    const { removeFromCart } = useShoppiongCart();
    const item = storeItemsData.find(data => data.id === id);
    if(item == null) return null;
    
    return( 
        <>
            <Stack direction="horizontal" className="d-flex align-item-center" gap={2}>
                <img src={item.imgUrl} alt="cart images" style={{width: '125px', height: '75px', objectFit: 'cover'}} />
                <div className='me-auto'>
                    <div>{item.name} {quantity > 0 && <span className='' style={{fontSize: '0.65rem'}}>x{quantity}</span>}</div>
                    <div className='text-muted'>{formatCurrency(item.price)}</div>
                </div>
                <div>{formatCurrency(item.price * quantity)}</div>
                <Button variant="outline-danger" size="sm" onClick={()=> removeFromCart(id)}>x</Button>
            </Stack>
        </>
    )
}
export default CartItem;