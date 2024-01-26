import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const ProductCard = ({
    product: { _id, name, image, rating, numReviews, price },
}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${_id}`}>
                <Card.Img src={image} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/product/${_id}`}>
                    <Card.Title as='div' className='product-title'>
                        <strong>{name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <div className='my-2'>
                        <Rating value={rating} text={`${numReviews} reviews`} />
                    </div>
                </Card.Text>

                <Card.Text as='h3'>${price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
