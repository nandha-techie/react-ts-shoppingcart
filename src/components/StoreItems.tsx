import {Card, Button} from 'react-bootstrap'
import { formatCurrency } from '../utilities/formatCurrency'
import { useShoppiongCart } from '../context/ShoppingCartContext'

type StoreItemsProps = {
    id: number,
    name: string, 
    price: number,
    imgUrl: string
}

const StoreItems =({ id, name, price, imgUrl }: StoreItemsProps)=>{
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useShoppiongCart();
    const quantity = getItemQuantity(id);

    return(
        <Card>
            <Card.Img variant='top' src={imgUrl} height="200px" style={{ objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-center mb-4">
                    <span>{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <div className='mt-auto'>
                    { quantity === 0 ? <Button className='w-100' onClick={()=> increaseItemQuantity(id)}>Add to cart</Button> : 
                        <div className='d-flex align-items-center flex-column' style={{gap: '0.5rem'}}>
                            <div className='d-flex justify-content-center align-items-center' style={{gap: '0.5rem'}}>
                                <Button onClick={()=> increaseItemQuantity(id)}>+</Button>
                                <div>
                                    <span className='fs-4'>{quantity} </span> 
                                    in Cart
                                </div>                                    
                                <Button onClick={()=> decreaseItemQuantity(id)}>-</Button>
                            </div>
                            <Button variant='danger' size="sm" onClick={()=> removeFromCart(id)}>Remove</Button>
                        </div> 
                    }
                </div>
            </Card.Body>
        </Card>
    )
}

export default StoreItems;