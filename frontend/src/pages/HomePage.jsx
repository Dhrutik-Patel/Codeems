import React from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Row, Col } from 'react-bootstrap';

const HomePage = () => {
    const [products, setProducts] = React.useState([]);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        } catch (error) {
            console.log('\nERROR: ', error);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    });

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomePage;
