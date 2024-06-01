import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/EndPoint";
import classes from "./Results.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";


function Results() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        isLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>

        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className={classes.products__container}>
              {results?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderDesc={false}
                  renderAdd={true}
                />
              ))}
            </div>
          )}
        </>
      </section>
    </LayOut>
  );
}

export default Results;
