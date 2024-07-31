
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ShippingAddress from '../../components/Address/ShippingAddress'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import styles from './CheckoutPage.module.css'
import Payment from '../../components/Payment/Payment'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserEmail } from '../../features/Checkout/checkoutSlice'
import { useEffect } from 'react'
export default function CheckoutPage() {
  const defaultAddress = useSelector(state=>state.checkout.defaultAddress);
  const orderSummaryData = useSelector(state=>state.checkout.orderSummaryData);
  const totalPayment = useSelector(state=>state.checkout.totalPayment);
  const userEmail = useSelector(state=>state.user.userEmail);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const spm = searchParams.get('spm');
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUserId = sessionStorage.getItem('userId');
    if (!storedToken || !storedUserId) {
      navigate('/login');
    }
    }, [navigate]);
  
  dispatch(setUserEmail(useSelector(state=>state.user.userEmail)));
        async function createOrder(paymentMethod){
            const addressId = defaultAddress._id;
            const email =userEmail;
            const totalCost = totalPayment;
            const status = "PENDING";
            let items = [];
            if(spm === 'proceed_to_checkout'){
                items= orderSummaryData.items.map(item => {
                  return {
                    productId: item.productId._id,
                    quantity: item.quantity
                  }
              });
            }
            else{
               items = [{
                productId: orderSummaryData._id,
                quantity: orderSummaryData.quantity
              }]
            }
            
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/order/create`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                addressId,
                email,
                totalCost,
                status,
                items,
                paymentMethod

              })
            });
            const data =await res.json();

            return data.order._id;
       }
  
  return (
    <>
      <Navbar/>
          <div className={styles['container']}>
            <div className={styles['left']}>
              <ShippingAddress  />
              <Payment createOrder={createOrder}/>
            </div>
            <OrderSummary spm={spm} /> 
          </div>
      <Footer/>
    </>
  )
}
