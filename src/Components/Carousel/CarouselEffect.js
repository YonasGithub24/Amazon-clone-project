import React from "react";
import classes from "./Carousel.module.css";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/Data";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {img?.map((imageItemLink,i) => {
          return <img src={imageItemLink} key={i} />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
