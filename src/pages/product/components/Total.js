import { useSelector } from 'react-redux';
import './total.css';

function Total() {
    const { cart } = useSelector((state) => state.menu);
    const getTotal = () => {
        let totalQuantity = 0;
        let totalPrice = 0;
        cart.forEach((item) => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;
        });
        return { totalPrice, totalQuantity };
    };
    return (
        <div className="total">
            <h2>ยอดรวม</h2>
            <div>
                <p className="total__p">
                    สินค้า ({getTotal().totalQuantity} ชิ้น) : <strong>ทั้งหมด {getTotal().totalPrice} บาท</strong>
                </p>
            </div>
        </div>
    );
}

export default Total;
