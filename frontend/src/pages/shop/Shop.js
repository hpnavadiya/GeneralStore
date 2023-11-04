import React from 'react';
import "./Home.scss";
import ProductCorousel from '../../components/corousel/Corousel';
import CorouselItem from '../../components/corousel/CorouselItem';
import { productData } from '../../components/corousel/data';

const PageHeading = ({ heading }) => {
    return (
        <>
            <div className="--flex-between">
                <h2 className="--fw-thin">{heading}</h2>
            </div>
            <div className="--hr"></div>
        </>
    );
};

const Shop = () => {

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
                <section>
                    <div className="container">
                        <PageHeading heading={"All Product"} />
                        <ProductCorousel products={productss} />
                    </div>
                </section>
                <section>
                    <div className="container">
                        <ProductCorousel products={productss} />
                    </div>
                </section>

                <section>
                    <div className="container">
                        <ProductCorousel products={productss} />
                    </div>
                </section>

                <section>
                    <div className="container">
                        <ProductCorousel products={productss} />
                    </div>
                </section>

        </>
    )
}

export default Shop
