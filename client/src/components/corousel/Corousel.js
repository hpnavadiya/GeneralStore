import React from 'react';
import Corousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; 
import {responsive} from "./data";

const ProductCorousel = ({products}) => {
  return (
    <div>
      <Corousel
        showDots={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        customTransition="all 500ms ease"
        transitionDuration={1000}
      >
        {products}  
      </Corousel>

    </div>
  )
}

export default ProductCorousel
