import React, { useEffect, useState } from "react";
import "./Products.css";
import { Product } from "../../../global";
import ProductsGrid from "./components/ProductsGrid";
import Loader from "../../../components/ui/Loader";
import toast from "react-hot-toast";

const Products = () => {
  const [total, setTotal] = React.useState(0);
  const [skip, setSkip] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [products, setProducts] = React.useState<Product[]>([] as Product[]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [price, setPrice] = React.useState<undefined | number>(undefined);
  const [cart, setCart] = useState<Product[]>([] as Product[]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let link = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
        if (search) {
          link = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
        }
        const res = await fetch(link);
        const data = await res.json();
        if (price) {
          const filteredProducts = data.products.filter((product: Product) => {
            const productPrice = product.price;
            return price === undefined || productPrice <= price;
          });
          setProducts(filteredProducts);
        } else {
          setProducts(data.products);
        }
        setTotal(data.total);
        setSkip(data.skip);
        setLimit(data.limit);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));

    const delayFetch = setTimeout(() => {
      fetchProducts();
    }, 1000);

    return () => {
      clearTimeout(delayFetch);
    };
  }, [search, skip, limit, price]);

  const resetAllFilters = () => {
    setSearch("");
    setLimit(10);
    setSkip(10);
    setSearch("");
    setPrice(0);
  };

  return (
    <>
      <section className="container">
        <div className="cart-info">
          <p>Cart Count: {cart.length}</p>
          <p>
            Total Amount: $
            {cart
              .reduce((total, product) => total + product.price, 0)
              .toFixed(2)}
          </p>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search with the given name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search with the maximum price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <button className="btn" onClick={() => resetAllFilters()}>
            Reset
          </button>
        </div>
        <div className="grid grid-cols-12">
          {loading ? (
            <Loader />
          ) : (
            <>
              {products.length > 0 ? (
                <ProductsGrid products={products} />
              ) : (
                <div className="col-span-12 noProduct">No products found</div>
              )}
            </>
          )}
        </div>
        <div className="pagination">
          <button
            className="btn btn-primary text-center w-full"
            onClick={() => setSkip((prev) => prev + limit)}
            disabled={skip + limit >= total}
          >
            {skip + limit >= total ? "No more products" : "Load more products"}
          </button>
        </div>
      </section>
    </>
  );
};

export default Products;
