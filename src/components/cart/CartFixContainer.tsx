import { useState } from "react";
import CartButton from "./CartButton";
import CartModal from "./CartModal";

const CartFixContainer = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-8 right-8">
            <CartButton onClick={() => setOpen((prev) => !prev)} />
            {open && <CartModal onClose={() => setOpen(false)} />}
        </div>
    )
}
export default CartFixContainer;