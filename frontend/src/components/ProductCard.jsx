import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                    <Card.Title as='div'>
                        <strong>{name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <div className='my-3'>
                        {rating} from {numReviews} reviews
                    </div>
                </Card.Text>
                <Card.Text as='h3'>${price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
