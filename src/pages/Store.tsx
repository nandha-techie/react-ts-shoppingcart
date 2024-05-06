import { Row, Col, Container } from 'react-bootstrap';
import StoreItems from '../components/StoreItems'
import storeItemsData from '../data/data.json';

const Store = ()=>{
    return (
        <Container fluid>
            <h1>Store</h1>
            <Row md={2} sm={1} xs={1} lg={3} className="g-3">
                { storeItemsData.map(item => (
                    <Col key={item.id}>
                        <StoreItems {...item} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
export default Store;