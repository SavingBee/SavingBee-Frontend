import { AddCartRequest } from "@/api/cart/addCartItem";

const LOCAL_KEY = "guest_cart";

export function getLocalCart(): AddCartRequest[] {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw) as AddCartRequest[];
    } catch {
        return [];
    }
}

export function setLocalCart(cart: AddCartRequest[]) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(cart));
}

export function addToLocalCart(item: AddCartRequest): boolean {
    const current = getLocalCart();
    const exists = current.some(
        (i) =>
            i.productCode === item.productCode && i.productType === item.productType
    );
    if (exists) return false;
    current.push(item);
    setLocalCart(current);
    return true;
}
