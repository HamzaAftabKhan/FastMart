import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import SimpleSlider from '../../components/Slider/SimpleSlider';
import Products from '../../components/ProductSlider/Products';
import Footer from '../../components/Footer/Footer';
import ShopByCategories from '../../components/CategoryList/ShopByCategories';
import { useState, useEffect } from 'react';
import SpinnerFullPage from '../../components/Spinner/SpinnerFullPage';
export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const userId = urlParams.get('userId');
  useEffect(() => {
      const storedToken = sessionStorage.getItem('token');
      const storedUserId = sessionStorage.getItem('userId');
      if (!storedToken || !storedUserId) {
        if (!token || !userId) {
          navigate('/login');
        }
      }
  }, [navigate,token,userId]);
  async function fetchNewArrival(){
    try{
      setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/newArrivals`);
        if(!res.ok){
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setNewArrivals(data);
    }
    catch(e)
    {
      setLoading(false);
      setError(error);
      console.error('Error fetching data:', e);
    }
    finally{
      setLoading(false);
    }
  }
  async function fetchBestSellers(){
    try{
      setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/bestSeller`);
        if(!res.ok){
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setBestSellers(data);
    }
    catch(e)
    {
      setError(error);
      setLoading(false);
      console.error('Error fetching data:', e);
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    
    fetchBestSellers();
    fetchNewArrival();
  },[]);
  useEffect(() => {
    if (token && userId) {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userId', userId);
      window.history.replaceState({}, document.title, "/"); // Remove the token and userId from the URL
    } else {
      const storedToken = sessionStorage.getItem('token');
      const storedUserId = sessionStorage.getItem('userId');

      if (!storedToken || !storedUserId) {
        navigate('/login');
      }
    }

    setLoading(false);
  }, [navigate, token, userId]);
  if (loading) {
      return <SpinnerFullPage/>;
  }

  if (error) {
    return <p>{error.message}</p>; // Convert error object to a string
  }

  return (
    <div>
      <Navbar />
      <SimpleSlider />
      <ShopByCategories />
      <Products heading={"Best Sellers"}  products={bestSellers}/>
      <Products heading={"New Arrivals"}  products={newArrivals}/>
      <Footer />
    </div>
  );
}
