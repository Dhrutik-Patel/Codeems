import React from 'react';
import ProductCard from '../components/ProductCard';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomePage = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    if (isLoading) return <Loader />;

    if (error)
        return (
            <Message variant='danger'>
                {error.data?.message || error.error}
            </Message>
        );

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
