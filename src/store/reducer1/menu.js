// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    cart: [],
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.openItem = action.payload.openItem;
        },

        activeComponent(state, action) {
            state.openComponent = action.payload.openComponent;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload.drawerOpen;
        },

        openComponentDrawer(state, action) {
            state.componentDrawerOpen = action.payload.componentDrawerOpen;
        },

        addToCart(state, action) {
            const itemInCart = state.cart.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },

        incrementQuantity(state, action) {
            const item = state.cart.find((item) => item.id === action.payload);
            item.quantity++;
        },

        decrementQuantity(state, action) {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item.quantity === 1) {
                item.quantity = 1;
            } else {
                item.quantity--;
            }
        },

        removeItem(state, action) {
            const removeItem = state.cart.filter((item) => item.id !== action.payload);
            state.cart = removeItem;
        },

        deleteAllItem(state, action) {
            state.cart = [];
        }
    }
});

export default menu.reducer;

export const {
    activeItem,
    activeComponent,
    openDrawer,
    openComponentDrawer,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    deleteAllItem
} = menu.actions;
