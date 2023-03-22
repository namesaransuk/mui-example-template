import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/reducer1/menu';
// import './item.css';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

function Item({ id, title, image, price }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {loading ? <Skeleton variant="rectangular" height={350} /> : <CardMedia component="img" image={image} alt="random" />}
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {loading ? <Skeleton /> : title}
                </Typography>
                <Typography>{loading ? <Skeleton /> : price + ' บาท'}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View</Button>
                <Button
                    size="small"
                    onClick={() =>
                        dispatch(
                            addToCart({
                                id,
                                title,
                                image,
                                price
                            })
                        )
                    }
                >
                    Buy
                </Button>
            </CardActions>
        </Card>
    );
}

export default Item;
