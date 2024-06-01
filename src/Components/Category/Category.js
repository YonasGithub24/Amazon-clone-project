import React from "react";
import { categoryInfos } from "./CategoryFullInfos";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

function Category() {
  return (
    <section className={classes.catagory_container}>
      {categoryInfos.map((infos, i) => (
        <CategoryCard key={i} data={infos} />
      ))}
    </section>
  );
}

export default Category;

