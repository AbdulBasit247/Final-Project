import React, { use, useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductsDetails from '../components/Products/ProductsDetails'
import ProductsGrid from '../components/Products/ProductsGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturedSection'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { fetchProductsByFilters } from '../redux/slices/productsSlice'



const Home = () => {


  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setbestSellerProduct] = useState(null);


  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(fetchProductsByFilters({
      gender: "Women",
      category: "Bottom Wear",
      limit: 8
    })
    );

    // Fetch best seller products

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setbestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestSeller();

  }, [dispatch]);

  // const placeHolderProducts = [
  //   {
  //     id: 1,
  //     name: 'Casual Shirt',
  //     price: 100,
  //     image: [{ url: 'https://picsum.photos/200/200?random=11' }]
  //   },
  //   {
  //     id: 2,
  //     name: 'Denim Jeans',
  //     price: 60,
  //     image: [{ url: 'https://picsum.photos/200/200?random=22' }]
  //   },
  //   {
  //     id: 3,
  //     name: 'Running Shoes',
  //     price: 80,
  //     image: [{ url: 'https://picsum.photos/200/200?random=33' }]
  //   },
  //   {
  //     id: 4,
  //     name: 'Running Shoes',
  //     price: 120,
  //     image: [{ url: 'https://picsum.photos/200/200?random=44' }]
  //   },
  //   {
  //     id: 5,
  //     name: 'Casual Shirt',
  //     price: 100,
  //     image: [{ url: 'https://picsum.photos/200/200?random=55' }]
  //   },
  //   {
  //     id: 6,
  //     name: 'Denim Jeans',
  //     price: 60,
  //     image: [{ url: 'https://picsum.photos/200/200?random=66' }]
  //   },
  //   {
  //     id: 7,
  //     name: 'Running Shoes',
  //     price: 80,
  //     image: [{ url: 'https://picsum.photos/200/200?random=77' }]
  //   },
  //   {
  //     id: 8,
  //     name: 'Running Shoes',
  //     price: 120,
  //     image: [{ url: 'https://picsum.photos/200/200?random=88' }]
  //   }
  // ];


  return (
    <div>

      {/* Main Image */}

      <Hero />

      {/* Men and Women Collections */}

      <GenderCollectionSection />

      {/* Explore New Arrivals */}

      <NewArrivals />

      {/* Best Seller and You May Also Like */}

      {bestSellerProduct ? (
        <ProductsDetails productId={bestSellerProduct._id} />
      ) : (
        <p className='text-center'>Loading Best Seller Product ...</p>
      )}

      {/* Top Wears for Women */}

      <div className='container mx-auto'>
        <h2 className='text-center text-3xl font-bold mb-4'>Top Wears for Women</h2>
        <ProductsGrid products={products} loading={loading} error={error} />
      </div>


      <FeaturedCollection />
      <FeaturesSection />
    </div>
  )
}

export default Home