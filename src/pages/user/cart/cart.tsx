import { Product } from "../../../global";
import { useCartContext } from "../../../hooks/useCart";
import "./cart.css";

const Cart = () => {
  const { removeFromCart } = useCartContext();
  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const token = localStorage.getItem("auth-token");
  if (!token) {
    return (
      <section className="container">
        <div className="cart-info">
          <p>Please login to view cart</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <div className="cart-info">
        <p>Cart Count: {cartItems.length}</p>
      </div>
      {cartItems.map((product: Product) => (
        <div className="product" key={product.id}>
          <img src={product.thumbnail} alt={product.title} />
          <div className="product__info">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <p>Rating: {product.rating}</p>
          </div>
          <div className="buttons-group">
            <button
              className="btn btn-primary"
              onClick={() => removeFromCart(product)}
            >
              Remove
            </button>
            <button className="btn btn-secondary">Buy Now</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Cart;
