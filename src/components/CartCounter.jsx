import useCartContext from "../contexts/CartContext";
export default function CartCounter() {
  const { cartItems } = useCartContext();
  return <span>({cartItems.length})</span>;
}
