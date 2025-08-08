import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || ""
  );

  const handleAddToCart = () => {
    dispatch(addCart({ ...product, variant: selectedVariant }));
    toast.success("Added to cart");
  };

  const isOutOfStock = !product.inStock;

  return (
    <div className="col-md-4 col-sm-6 col-xs-12 mb-4">
      <div
        className="card h-100 shadow-sm border-0 d-flex flex-column"
        style={{ borderRadius: "12px", overflow: "hidden" }}
      >
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          fetchpriority="high"
          className="card-img-top"
          style={{
            height: "250px",
            objectFit: "contain",
            backgroundColor: "#fafafa",
          }}
        />

        {/* Product Info */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate">{product.title}</h5>
          <p className="lead fw-bold mb-2">${product.price}</p>

          {/* Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <select
              className="form-select mb-3"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
            >
              {product.variants.map((variant, idx) => (
                <option key={idx} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          )}

          {/* Spacer to push buttons down */}
          <div className="mt-auto">
            {isOutOfStock ? (
              <button className="btn btn-secondary w-100" disabled>
                Out of Stock
              </button>
            ) : (
              <button
                className="btn btn-dark w-100"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}
            <Link
              to={`/product/${product.id}`}
              className="btn btn-outline-dark w-100 mt-2"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
