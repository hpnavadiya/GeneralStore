import React, { useState } from 'react'
import Slider from '../../components/slider/Slider'
import "./Home.scss"
import HomeInfoBox from './HomeInfoBox'
// import CorouselItem from '../../components/corousel/CorouselItem'
// import ProductCorousel from '../../components/corousel/Corousel'
import ProductCategory from './ProductCategory';
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
// import { useCart } from '../../context/cart'
import { useNavigate } from 'react-router-dom'
import "../../styles/ProductDetailsStyles.css";

const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="btn btn-info">{btnText}</button>
      </div>
      <div className="--hr"></div>
    </>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // const [relatedProducts, setRelatedProducts] = useState([]);

  // const [cart, setCart] = useCart();


  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };


  //lifecycle method
  // useEffect(() => {
  //   getAllProducts();
  // }, []);
  console.log(getAllProducts());

  // const buttonClickToCart = (p) => {
  //   setCart([...cart, p]);
  //   localStorage.setItem("cart", JSON.stringify([...cart, p]));
  //   toast.success("Item Added to cart");
  // };

  // const productss = products.map((p) => (
  //   <div key={p.id}>
  //     <CorouselItem
  //       name={p.name}
  //       url={`/api/v1/product/product-photo/${p._id}`}
  //       price={p.price}
  //       description={p.description}
  //       click = {buttonClickToCart()}
  //     />
  //   </div>
  // ));


  return (
    <>
      <Layout>
        <Slider />
        <section>
          <div className="container">
            <HomeInfoBox />
            <PageHeading heading={"Explore Products ➡️"} btnText={"Shop Now>>>"} />
            {/* <ProductCorousel products={productss} /> */}

            <div className="row container similar-products">
              {/* <h4>Explore Products ➡️</h4> */}
              {/* {product.length < 1 && (
                <p className="text-center">No Similar Products found</p>
              )} */}
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <div className="card m-2" key={p._id}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                      </div>
                      <p className="card-text ">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="card-name-price">
                        <button
                          className="btn btn-info ms-1"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        {/* <button
                            className="btn btn-dark ms-1"
                            onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                              );
                              toast.success("Item Added to cart");
                            }}
                          >
                            ADD TO CART
                          </button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section className="--bg-grey">
          <div className="container">
            <h3>Categories</h3>
            <ProductCategory />
          </div>
        </section>

        {/* <section>
        <div className="container">
          <PageHeading heading={"Mobile Phones"} btnText={"Shop Now>>>"} />
          <ProductCorousel products={productss} />
        </div>
      </section> */}
      </Layout>
    </>
  )
}

export default Home