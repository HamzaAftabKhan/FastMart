import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ProductList from '../../components/ProductList/ProductList';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
export default function SearchPage() {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const query = new URLSearchParams(location.search).get('q');
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products?q=${query}`);
                const data =await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [location.search]);
  return (
    <div>
        <Navbar />
        <ProductList 
          products={products} url={"Search Results"}
           setProducts={setProducts}
           message={"Search Not Found"}/>
        <Footer/>
      
    </div>
  )
}
