import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './components/Item';
import AddAlert from './Alert';
import './index.css';

// import { ShoppingCart } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

function Album() {
    // const navigate = useNavigate();
    // const { cart } = useSelector((state) => state.menu);
    // const getTotalQuantity = () => {
    //     let total = 0;
    //     cart.forEach((item) => {
    //         total += item.quantity;
    //     });
    //     return total;
    // };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost/react-api/product.php')
            // .post('http://127.0.0.1:8000/api/v1/product/list')

            .then((response) => {
                setProductList(response.data);
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Container sx={{ py: 5 }}>
                    <Grid container spacing={4}>
                        {loading ? (
                            <>
                                {productList.map((row, index) => (
                                    <Grid item key={index} xs={12} sm={6} md={4}>
                                        <Skeleton variant="rectangular" height={350} />
                                        <Skeleton />
                                        <Skeleton width="60%" />
                                    </Grid>
                                ))}
                            </>
                        ) : (
                            <>
                                {productList.map((row, index) => (
                                    <Grid item key={index} xs={12} sm={6} md={4}>
                                        <Item id={row.id} title={row.name} price={row.price} image={row.picture} />
                                    </Grid>
                                ))}
                            </>
                        )}
                    </Grid>
                </Container>
                <AddAlert />
                {/* <div className="shopping-cart" onClick={() => navigate('/dashboard/cart')}>
                    {' '}
                    <ShoppingCart id="cartIcon" />
                    <p>{getTotalQuantity() || 0}</p>
                </div> */}
            </main>
            {/* Footer */}
            {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box> */}
            {/* End footer */}
        </ThemeProvider>
    );
}

export default Album;
