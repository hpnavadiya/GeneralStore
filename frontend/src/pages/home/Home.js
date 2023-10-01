import React from 'react'
import Slider from '../../components/slider/Slider'
import "./Home.scss"
import HomeInfoBox from './HomeInfoBox'
import {productData} from "../../components/corousel/data"
import CorouselItem from '../../components/corousel/CorouselItem'
import ProductCorousel from '../../components/corousel/Corousel'

const PageHeading = ({heading, btnText}) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="--btn">{btnText}</button>
      </div>
      <div className="--hr"></div>
    </>
  );
};

const Home = () => {

  const productss = productData.map((item) => (
    <div key={item.id}>
      <CorouselItem
        name={item.name}
        url={item.url}
        price={item.price}
        description={item.description}
      />
    </div>
  ))

  return (
    <>
      <Slider />
      <section>
        <div className="container">
          <HomeInfoBox />
          <PageHeading heading={"Latest Product"} btnText={"Shop Now>>>"} />
          <ProductCorousel products={productss} />
        </div>
      </section>
    </>
  )
}

export default Home