import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import StripeButton from './StripeButton';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


// const cart = {
//     products: [
//         {
//             name: "Stylish Jacket",
//             size: "M",
//             color: "Black",
//             price: 120,
//             image: 'https://picsum.photos/200/200?random=2'
//         },
//         {
//             name: "Stylish Jacket",
//             size: "M",
//             color: "Black",
//             price: 120,
//             image: 'https://picsum.photos/200/200?random=2'
//         },
//     ],
//     totalPrice: 190
// }


const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, loading, error } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [checkoutId, setCheckoutId] = useState(null);

    const [shippingAddress, setShippingAddress] = useState({
        firstname: '',
        lastname: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        phone: ''
    });


    // Ensure Cart is looked before proceeding
    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate('/');
        }
    }, [cart, navigate]);

    const hadnleCreateChekout = async (e) => {
        e.preventDefault();
        if (cart && cart.products.length > 0) {
            const res = await dispatch(
                createCheckout({
                    checkoutItems: cart.products,
                    shippingAddress,
                    paymentMethod: "Cash on Delivery",
                    totalPrice: cart.totalPrice,

                })
            );
            if (res.payload && res.payload._id) {
                setCheckoutId(res.payload._id);
            }
        }
    };

    const handlePaymentSuccess = async (details) => {
        alert('Payment Successful!');
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );

            await handleFinalizeCheckout(checkoutId);

        } catch (error) {
            console.error(error);
        }
    }



    const handleFinalizeCheckout = async (checkoutId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );

            navigate('/order-confirmation');

        } catch (error) {
            console.error(error);
        }
    }


    if (loading) return <p>Loading Cart...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!cart || !cart.products || cart.products.length === 0) return <p>Your cart is empty.</p>;



    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>

            {/* Left Section */}

            <div className='bg-white rounded-lg p-6'>

                <h2 className='text-2xl uppercase mb-6'>Checkout</h2>

                <form onSubmit={handlePaymentSuccess}>

                    <h3 className='text-lg mb-4'>Contact Details</h3>

                    <div className='mb-4'>
                        <label className='block text-gray-700'>Email</label>
                        <input type="email" value={user ? user.email : ''} className='w-full p-2 border rounded' disabled />
                    </div>

                    <h3 className='text-lg mb-4'>Delivery</h3>

                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-gray-700'>First Name</label>
                            <input
                                type="text"
                                value={shippingAddress.firstname}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, firstname: e.target.value })}
                                className='w-full p-2 border rounded'
                                required />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Last Name</label>
                            <input
                                type="text"
                                value={shippingAddress.lastname}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, lastname: e.target.value })}
                                className='w-full p-2 border rounded'
                                required />
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700'>Address</label>
                        <input
                            type="text"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            className='w-full p-2 border rounded'
                            required />
                    </div>

                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-gray-700'>City</label>
                            <input
                                type="text"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                className='w-full p-2 border rounded'
                                required />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Postal Code</label>
                            <input
                                type="text"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                className='w-full p-2 border rounded'
                                required />
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700'>Phone</label>
                        <input
                            type="text"
                            value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                            className='w-full p-2 border rounded'
                            required />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700'>Country</label>
                        <input
                            type="text"
                            value={shippingAddress.country}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                            className='w-full p-2 border rounded'
                            required />
                    </div>

                    <div className='mt-6'>
                        {!checkoutId ? (
                            <button type='submit' className='w-full bg-black text-white py-3 rounded'>Continue to Payment</button>
                        ) : (
                            <div>
                                <h3 className='text-lg mb-4'>Pay with Stripe</h3>
                                {/* Stripe Button Component */}
                            </div>
                        )}
                    </div>

                </form>
            </div>

            {/* Right Section */}

            <div>

                <h3>Order Summary</h3>

                <div>
                    {cart.products.map((product, index) => (
                        <div key={index} className='flex items-start justify-between py-2 border-b'>
                            <div className='flex items-center'>
                                <img src={product.image} alt={product.name} className='w-20 h-24 object-cover' />
                                <div>
                                    <h3 className='font-medium'>{product.name}</h3>
                                    <p className='text-gray-500'>Size: {product.size}</p>
                                    <p className='text-gray-500'>Color: {product.color}</p>
                                </div>
                            </div>
                            <p className='text-xl'>${product.price?.toLocaleString()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex justify-between items-center text-lg mb-4'>
                    <p>Subtotal</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>

                <div className='flex justify-between items-center text-lg'>
                    <p>Shipping</p>
                    <p>Free</p>
                </div>

                <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
                    <p>Total</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>

            </div>
        </div>
    )
}

export default Checkout