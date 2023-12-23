import React, { createContext, useContext, ReactNode } from "react";
import { Product } from "../global";
import toast from "react-hot-toast";

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
  initialCart: Product[];
}

export const CartProvider = ({ children, initialCart }: CartProviderProps) => {
  const [cart, setCart] = React.useState<Product[]>(initialCart);

  const addToCart = (product: Product) => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      toast.error("Please login to add product to cart");
      return;
    }
    setCart((prevCart) => {
      const isProductInCart = prevCart.some((item) => item.id === product.id);

      if (isProductInCart) {
        toast.error("Product already in cart");
        return prevCart;
      }

      const updatedCart = [...prevCart, { ...product, cartItemId: Date.now() }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Product added to cart");
      return updatedCart;
    });
  };

  const removeFromCart = (product: Product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.some((item) => item.id === product.id);

      if (!isProductInCart) {
        toast.error("Product not in cart");
        return prevCart;
      }

      const updatedCart = prevCart.filter((item) => item.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Product removed from cart");
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    toast.error("useCartContext must be used within a CartProvider");
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
};
