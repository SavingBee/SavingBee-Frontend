import CartButton from "./CartButton";
import CartModal from "./CartModal";


const CartFixContainer = () => {
    return (
        <div className="fixed bottom-20 right-5">
            <CartButton />
            <CartModal />
        </div>
    )
}
export default CartFixContainer;