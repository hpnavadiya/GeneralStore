import React from 'react';
import './ProductCategory.scss';
import { useNavigate } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
import "../../styles/AuthStyles.css";
// const Category = ({ title, image }) => {
//   const navigate = useNavigate();
//   return (
//     <div className="category">

//     </div>
//   );
// };

const ProductCategory = () => {
  const categories = useCategory();
  const navigate = useNavigate();

  return (
    <div className="categories">
      {categories.map((cat) => {
        return (
          <div className="--flex-center categoryStyle">
            {/* <Category title={cat.name} /> */}
            <h3>{cat.name.substring(0, 14)}...</h3>
            <button className="btn btn-primary" onClick={() => navigate(`/category/${cat.slug}`)}>
              {'Shop Now'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCategory;
