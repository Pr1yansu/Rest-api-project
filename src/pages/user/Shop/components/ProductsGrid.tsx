import { Link } from "react-router-dom";
import { Product } from "../../../../global";
import { useCartContext } from "../../../../hooks/useCart";

const ProductsGrid = ({ products }: { products: Product[] }) => {
  const { addToCart } = useCartContext();
  return (
    <>
      {products.map((product: Product, index: number) => (
        <Link
          className="col-span-4"
          key={index}
          to={`/product/detail/${product.id}`}
        >
          <div className="card">
            <div className="card-image">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="card-body">
              <div className="card-title">{product.title}</div>
              <div className="card-subtitle">{product.description}</div>
              <div className="card-price flex justify-between items-center w-full">
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "INR",
                  }).format(product.price)}
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ProductsGrid;
