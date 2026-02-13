import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewArrivals = () => {

    const [newArrivals, setnewArrivals] = useState([]);

    useEffect(() => {

        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
                );
                setnewArrivals(response.data);
            } catch (error) {
                console.error('Error fetching new arrivals:', error);
            }
        }

        fetchNewArrivals();
    }, [])



    return (
        <section className='py-16 px-4 lg:px-0'>

            <div className='container mx-auto text-center mb-10 relative'>
                <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
                <p className='text-gray-600 text-lg mb-8'>Discover the latest styles straight off the runway, freshly added to kepp your wardrobe on the cutting edge of fashion</p>
            </div>

            <div className='container mx-auto overflow-x-scroll flex space-x-6'>
                {newArrivals.map((product) => {
                    const image = product.images?.[0];

                    return (
                        <div
                            key={product._id}
                            className="min-w-full sm:min-w-[50%] lg:min-w-[25%] relative"
                        >
                            <img
                                src={image?.url}
                                alt={image?.altText || product.name}
                                className="w-full h-64 object-cover"
                            />

                            <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md text-white p-4">
                                <Link to={`/products/${product._id}`} className="block">
                                    <h4 className="font-medium">{product.name}</h4>
                                    <p className="mt-1">${product.price}</p>
                                </Link>
                            </div>
                        </div>
                    );
                })}




                {/* {newArrivals.map(product => (
                    <div key={product.id} className='min-w-full sm:min-w-[50%] lg:min-w-[25%] relative'>
                        <img src={product.image} alt={product.name} />
                        <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg'>
                            <Link to={`/products/${product.id}`} className='block'>
                                <h4 className='font-medium'>{product.name}</h4>
                                <p className='mt-1'>${product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))} */}
            </div>

        </section>
    )
}

export default NewArrivals
