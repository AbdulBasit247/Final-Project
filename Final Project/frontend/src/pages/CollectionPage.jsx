import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSideBar';
import SortOptions from '../components/Products/SortOptions';
import ProductsGrid from '../components/Products/ProductsGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const CollectionPage = () => {

    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams]);

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setisSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }, [ dispatch, collection, searchParams]);

    const toggleSiderBar = () => {
        setisSidebarOpen(!isSidebarOpen);
    }


    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setisSidebarOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    // useEffect(() => {

    //     setTimeout(() => {

    //         const fetchedProducts = [
    //             {
    //                 id: 1,
    //                 name: 'Casual Shirt',
    //                 price: 100,
    //                 image: [{ url: 'https://picsum.photos/200/200?random=1' }]
    //             },
    //             {
    //                 id: 2,
    //                 name: 'Denim Jeans',
    //                 price: 60,
    //                 image: [{ url: 'https://picsum.photos/200/200?random=2' }]
    //             },
    //             {
    //                 id: 3,
    //                 name: 'Running Shoes',
    //                 price: 80,
    //                 image: [{ url: 'https://picsum.photos/200/200?random=3' }]
    //             },
    //             {
    //                 id: 4,
    //                 name: 'Running Shoes',
    //                 price: 120,
    //                 image: [{ url: 'https://picsum.photos/200/200?random=4' }]
    //             },
    //             {
    //                 id: 5,
    //                 name: 'Casual Shirt',
    //                 price: 100,
    //                 image: [{ url: 'https://picsum.photos/200/200?random=5' }]
    //             },
    //             {
    //                 id: 6,
    //                 name: 'Denim Jeans',
    //                 price: 60,
    //                 image: [{ url: 'https://picsum.photos/200/200?random=6' }]
    //             },
    //             {
    //                 id: 7,
    //                 name: 'Running Shoes',
    //                 price: 80,
    //                 image: [{ url: 'https://picsum.photos/200/200?random=7' }]
    //             },
    //             {
    //                 id: 8,
    //                 name: 'Running Shoes',
    //                 price: 120,
    //                 image: [{ url: 'https://picsum.photos/200/200?random=8' }]
    //             }
    //         ];

    //         setproducts(fetchedProducts);

    //     }, 1000);
    // }, []);

    return (
        <div className='flex flex-col lg:flex-row'>

            {/* Mobile Filter Button */}
            <button onClick={toggleSiderBar} className='lg:hidden border p-2 flex justify-center items-center'>
                <FaFilter className='mr-2' />
            </button>

            {/* filter Sidebar */}
            <div ref={sidebarRef} className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white overflow-y-auto transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:w-1/4`}>
                <FilterSidebar />
            </div>

            <div >
                <h2 className='text-2xl uppercase mb-4'>All Collections</h2>

                {/* Sort Options */}
                <SortOptions />

                {/* Products Grid */}
                <ProductsGrid products={products} loading={loading} error={error}/>
            </div>
        </div>
    )
}

export default CollectionPage