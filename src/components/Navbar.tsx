import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import  { Navbar as NavbarBs, Button }  from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useShoppiongCart } from '../context/ShoppingCartContext';

const Navbar = () =>{
    const { openCart, cartQuantity } = useShoppiongCart();
    return(
        <NavbarBs expand="lg" sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to='/' as={NavLink}>Home</Nav.Link>
                    <Nav.Link to='/store' as={NavLink}>Store</Nav.Link>
                    <Nav.Link to='/about' as={NavLink}>About</Nav.Link>
                </Nav>
                { cartQuantity > 0 && (
                    <Button onClick={openCart} style={{width: '50px', height: '50px', position: 'relative', left: '0'}} variant='outline-primary' className="d-flex justify-center rounded-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="1 -3 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/>
                        <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/>
                    </svg>
                    <div className='d-flex align-items-center justify-content-center rounded-circle bg-danger text-white' style={{width: '20px', height: '20px', position: 'absolute', bottom: '0', transform: 'translate(80%, 0%)' }}>{cartQuantity}</div>
                </Button>
                )}
            </Container>
        </NavbarBs>
    )
}

export default Navbar;