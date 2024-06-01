import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";


function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  

  useEffect(() => {
     setisLoading(true);
    
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setisLoading(false);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.product_container}>
          {products?.map((singleProduct) => (
            <ProductCard
              renderAdd={true}
              key={singleProduct.id}
              product={singleProduct}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
