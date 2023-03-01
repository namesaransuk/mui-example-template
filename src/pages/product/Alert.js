import * as React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import Cart from './Cart';

import { ShoppingCart } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAllItem } from '../../store/reducer1/menu';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

    // const navigate = useNavigate();
    const { cart } = useSelector((state) => state.menu);
    const getTotalQuantity = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item.quantity;
        });
        return total;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        cart.forEach((item, index) => {
            var order = {
                orderId: item.id,
                orderName: item.title,
                orderPrice: item.price * item.quantity,
                orderQuantity: item.quantity
            };

            axios
                .post('http://localhost/react-api/order.php', order)
                .then((response) => {
                    if ((response.status = 1)) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'เพิ่มสินค้าเรียบร้อย',
                            showConfirmButton: false,
                            timer: 1500,
                            width: 600,
                            padding: '3em',
                            background: '#ffff'
                        });
                        dispatch(deleteAllItem());
                        setTimeout(function () {
                            window.location.reload();
                        }, 1600);
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'เพิ่มพนักงานไม่สำเร็จ !!',
                            showConfirmButton: false,
                            timer: 1500,
                            width: 600,
                            padding: '3em',
                            background: '#ffff'
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        // console.log(results);
    };

    return (
        <div>
            <button className="shopping-cart" onClick={handleClickOpen}>
                <ShoppingCart id="cartIcon" />
                <p>{getTotalQuantity() || 0}</p>
            </button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Sound
                        </Typography>
                        <Button color="inherit" onClick={handleSubmit}>
                            Checkout
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <Cart />
                </List>
            </Dialog>
        </div>
    );
}
