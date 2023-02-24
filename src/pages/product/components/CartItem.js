import './cartItem.css';
import { incrementQuantity, decrementQuantity, removeItem } from '../../../store/reducer1/menu';
import { useDispatch } from 'react-redux';

function CartItem({ id, image, title, price, quantity = 0 }) {
    const dispatch = useDispatch();
    return (
        <div className="cartItem">
            <img className="cartItem__image" src={image} alt="item" />
            <div className="cartItem__info">
                <p className="cartItem__title">{title}</p>
                <p className="cartItem__price">
                    <strong>ราคา {price} บาท</strong>
                </p>
                <div className="cartItem__incrDec">
                    <small>จำนวน</small>
                    <button onClick={() => dispatch(decrementQuantity(id))}>-</button>
                    <p>{quantity}</p>
                    <button onClick={() => dispatch(incrementQuantity(id))}>+</button>
                </div>
                <button className="cartItem__removeButton" onClick={() => dispatch(removeItem(id))}>
                    ลบสินค้าออก
                </button>
            </div>
        </div>
    );
}
export default CartItem;
