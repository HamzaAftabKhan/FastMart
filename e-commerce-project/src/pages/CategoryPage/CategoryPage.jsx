import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import ProductList from '../../components/ProductList/ProductList'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
export default function CategoryPage() {
  
  const [products, setProducts] = useState([]);
  const categoryName = useParams().categoryName;
  const query = new URLSearchParams(window.location.search).get('q');
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUserId = sessionStorage.getItem('userId');
    if (!storedToken || !storedUserId) {
      navigate('/login');
    }
    }, [navigate]);
  useEffect(()=>{
    async function fetchProductsByCategory(){
     const res =await fetch(`${process.env.REACT_APP_BASE_URL}/product/category/${categoryName}`);
      const data=await res.json();
      if(query)
      {
        const filteredData = data.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
        setProducts(filteredData);
        return;
      }
      setProducts(data);
    }
    fetchProductsByCategory();
  },[categoryName]);
  return (
    <div>
        <Navbar />
        <ProductList  products={products} setProducts={setProducts} url={categoryName} message={`${categoryName} Unavailable`}/>
        <Footer/>
    </div>
  )
}
