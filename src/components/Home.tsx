
import BrandCard, { IBrandProps } from "./BrandCard.components";
import ProductCard, { IProductProps } from "./ProductCard.components";
import Search from "./Search.components";
import Footer from "./Footer.components";
import Header from "./Header.components";
import { useEffect, useState } from "react";
import { fetchProducts } from "../api/api";

const brand: IBrandProps[] = [
  {
    brandName: "nike",
    link: "link",
    image: "/assets/brand/nike.png",
  },
  {
    brandName: "pume",
    link: "link",
    image: "/assets/brand/puma.png",
  },
  {
    brandName: "reebook",
    link: "link",
    image: "/assets/brand/reebok.png",
  },
  {
    brandName: "converse",
    link: "link",
    image: "/assets/brand/converse.png",
  },
  {
    brandName: "adidas",
    link: "link",
    image: "/assets/brand/adidas.png",
  },
  {
    brandName: "asics",
    link: "link",
    image: "/assets/brand/asics.png",
  },
  {
    brandName: "new balance",
    link: "link",
    image: "/assets/brand/newbalance.png",
  },
  {
    brandName: "more...",
    link: "link",
    image: "/assets/brand/more.png",
  },
];

// const products: IProductProps[] = [
//   {
//     id: 1,
//     productName: "Adidas Sneakers",
//     price: 3000,
//     image: "assets/products/adidas/7.webp",
//   },
//   {
//     id: 2,
//     productName: "Asics Running Shoes",
//     price: 3000,
//     image: "/assets/products/asics/2.webp",
//   },
//   {
//     id: 3,
//     productName: "rebok Sneakers",
//     price: 3000,
//     image: "assets/products/reebok/7.webp",
//   },
//   {
//     id: 4,
//     productName: "nike Running Shoes",
//     price: 3000,
//     image: "/assets/products/puma/2.webp",
//   },
// ];

const Home = () => {
  const [products, setProducts] = useState<IProductProps[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);  

  const getProducts = async () => {
    try {
      const productsData = await fetchProducts();
      console.log(productsData);
      
      setProducts(productsData);
    } catch (error) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();  
  }, []);



  return (
    <div className="container px-4 text-base ">
      {/* Action Bar */}
      <div className="py-4 flex justify-between  items-center">
        <Header />
      </div>

      {/* Search Bar */}
      <Search />
      {/* Companies brand */}
      <div className="flex flex-wrap items-center justify-between gap-1">
        {brand.map((item, index) => (
          <BrandCard
            key={index}
            brandName={item.brandName}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>

      {/* Most Popular Section */}
      <div id="most-popular" className="mt-6">
        <header>
          <div
            id="header-title"
            className="flex justify-between items-center mb-4"
          >
            <p id="popular-btn" className="font-medium text-lg">
              Most Popular
            </p>
            <p id="all-btn" className="text-blue-500 cursor-pointer">
              See All
            </p>
          </div>
          <div id="header-buttons" className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
              All
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
              Nike
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
              Adidas
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
              Puma
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
              Asics
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
              Reebok
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
              New Balance
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
              Converse
            </button>
          </div>
        </header>
      </div>

      {/* Products */}
      <div id="products" className="flex p-1 mt-2 flex-wrap items-center justify-between gap-1">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.length > 0 ? (
            products.map((item) => (
              <ProductCard
                key={item.id}
                productName={item.productName}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <div>No products available.</div>
          )
        )}
      </div>

{/* {
   products.map((item) => (
    <ProductCard
      key={item.id}
      productName={item.productName}
      price={item.price}
      image={item.image}
    />
  ))
} */}
      {/* footer Buttons */}
      <Footer />
    </div>
  );
};

export default Home;
