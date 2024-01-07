import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author }) => {
  return (

    <div div >
      {/* react-helmet provides a convenient way to manage and update these meta tags and other 
head elements within your React components. Instead of directly manipulating the DOM or 
using traditional methods to update the head, you can use 
react-helmet to define these changes in a more declarative and component-based manner. */}


      {/* For SEO Implementation we use REACT HELMET  */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />

        {children}
      </main>
      <Footer />
    </div>
  );
};

// For SEO 
Layout.defaultProps = {
  title: "Ecommerce app - General Store",
  description: "MERN stack Web Project",
  keywords: "Mern, React, Node, Mongodb",
  author: "Group8 - Capstone",
};

export default Layout;
