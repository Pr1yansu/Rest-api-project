import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../global";
import Skeleton from "./components/Skeleton";
import { useCartContext } from "../../../hooks/useCart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCartContext();
  const [product, setProduct] = React.useState<Product>({} as Product);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedImage, setSelectedImage] = React.useState<string>("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <section className="container h-screen flex justify-center items-center">
        <div className="image-container">
          <Skeleton height={"100%"} />
        </div>
        <div className="details-container">
          <Skeleton width="50%" />
          <Skeleton width="100%" />
          <Skeleton width="80%" />
          <Skeleton width="70%" />
          <Skeleton width="70%" />
          <Skeleton width="20%" />
          <Skeleton width="20%" />
        </div>
      </section>
    );
  }
  return (
    <section className="container h-screen flex justify-center items-center">
      <div className="image-container">
        <img
          src={selectedImage || product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="image-list">
          {product.images &&
            product.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={product.title}
                className="image-list-item"
                onMouseEnter={() => setSelectedImage(image)}
                draggable={false}
              />
            ))}
        </div>
      </div>
      <div className="details-container">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "INR",
          }).format(product.price)}
        </p>
        <p>
          <b>Category:</b> {product.category}
        </p>
        <p>
          <b>Brand:</b> {product.brand}
        </p>
        <p>
          <b>Discount:</b> {product.discountPercentage}
        </p>
        <p>
          <b>Rating:</b>
          {product.rating}
        </p>
        <p>
          {product.stock > 0 ? (
            <span className="green">In stock</span>
          ) : (
            <span className="red">Out of stock</span>
          )}
        </p>
        <div className="buttons">
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
          <button className="btn btn-secondary">Buy now</button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
