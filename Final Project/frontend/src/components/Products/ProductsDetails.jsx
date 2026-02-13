import React, { use, useEffect, useState } from 'react'
import { toast } from 'sonner';
import ProductsGrid from './ProductsGrid';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductsDetails = ({ productId }) => {


    // const selectedProduct = {

    //     name: 'Stylish Jacket',
    //     price: 120,
    //     originalPrice: 150,
    //     description: 'A trendy jacket perfect for all seasons.',
    //     brand: 'FashionBrand',
    //     material: 'Leather',
    //     sizes: ['S', 'M', 'L', 'XL'],
    //     color: ['Red', 'Black'],
    //     images: [
    //         {
    //             url: 'https://picsum.photos/500/500?random=89',
    //             alt: 'Stylish Jacket 1'
    //         },
    //         {
    //             url: 'https://picsum.photos/500/500?random=74',
    //             alt: 'Stylish Jacket 2'
    //         },
    //         {
    //             url: 'https://picsum.photos/500/500?random=49',
    //             alt: 'Stylish Jacket 3'
    //         },
    //         {
    //             url: 'https://picsum.photos/500/500?random=92',
    //             alt: 'Stylish Jacket 4'
    //         }
    //     ]
    // };


    // const similarProducts = [
    //     {
    //         id: 1,
    //         name: 'Casual Shirt',
    //         price: 100,
    //         image: [{ url : 'https://picsum.photos/200/200?random=1'}]
    //     },
    //     {
    //         id: 2,
    //         name: 'Denim Jeans',
    //         price: 60,
    //         image: [{ url : 'https://picsum.photos/200/200?random=2'}]
    //     },
    //     {
    //         id: 3,
    //         name: 'Running Shoes',
    //         price: 80,
    //         image: [{ url : 'https://picsum.photos/200/200?random=3'}]
    //     },
    //     {
    //         id: 4,
    //         name: 'Running Shoes',
    //         price: 120,
    //         image: [{ url : 'https://picsum.photos/200/200?random=4'}]
    //     }
    // ];


    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
    const { user, guestId } = useSelector((state) => state.auth);
    const [mainImage, setmainImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const productFetchId = productId || id;

    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts(productFetchId));
        }
    }, [dispatch, productFetchId]);


    useEffect((() => {

        if (selectedProduct?.images?.length > 0) {
            setmainImage(selectedProduct.images[0].url);
        }
    }), []);


    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error('Please select size and color before adding to cart.');
            return;
        }

        setIsButtonDisabled(true);


        dispatch(
            addToCart({
                productId: productFetchId,
                size: selectedSize,
                color: selectedColor,
                quantity,
                guestId,
                userId: user?._id,
            })
        )
            .then(() => {
                toast.success('Product added to cart!', {
                    duration: 1000,
                });
            })
            .finally(() => {
                setIsButtonDisabled(false);
            });
    };


    if (loading) {
        return <p className='text-center'>Loading...</p>;
    }

    if (error) {
        return <p className='text-center text-red-500'>Error: {error}</p>;
    }

    return (

        <div className='p-6'>

            <h1 className='text-center text-5xl'>Best Seller</h1>

            {selectedProduct && (

                <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>

                    <div className='flex flex-col md:flex-row'>

                        {/* Left ThumbNails */}

                        <div className='hidden md:flex flex-col space-y-4 mr-6'>
                            {selectedProduct.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={image.alt}
                                    className={`w-20 h-20 cursor-pointer border object-cover rounded-lg ${mainImage === image.url ? 'border-black' : 'border-gray-300'}`}
                                    onClick={() => setmainImage(image.url)}
                                />
                            ))}
                        </div>

                        {/* Main Image */}

                        <div className='md:w-1/2'>
                            <div className='mb-4'>
                                <img className='w-full h-auto object-cover rounded-lg' src={mainImage} alt='Main Product' />
                            </div>
                        </div>

                        {/* Mobile Thumbnail */}

                        <div className='md:hidden flex overscroll-x-scroll space-x-4 mt-4'>
                            {selectedProduct.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={image.alt}
                                    className={`w-20 h-20 cursor-pointer border object-cover rounded-lg ${mainImage === image.url ? 'border-black' : 'border-gray-300'}`}
                                    onClick={() => setmainImage(image.url)}
                                />
                            ))}
                        </div>

                        {/* Right Side */}

                        <div className='md:w-1/2 sm:ml-6'>

                            <h1 className='text-2xl md:text-3xl mb-2 font-semibold'>{selectedProduct.name}</h1>
                            <p className='text-lg mb-1 text-gray-600 line-through'>
                                {`$${selectedProduct.originalPrice}`}
                            </p>
                            <p className='text-lg mb-1 text-gray-600'>
                                {`$${selectedProduct.price}`}
                            </p>

                            <div className='mb-4'>
                                <p className='text-gray-700'>Color:</p>
                                <div className='flex gap-2 mt-2'>
                                    {/* {selectedProduct.color.map((color) => (
                                        <button
                                            onClick={() => setSelectedColor(color)}
                                            key={color}
                                            className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'border-black border-2' : 'border-gray-300'}`}
                                            style={{ backgroundColor: color.toLocaleLowerCase(), filter: 'brightness(0.5)' }}
                                        ></button>
                                    ))} */}
                                    {selectedProduct?.colors?.map((color) => (
                                        <button
                                            onClick={() => setSelectedColor(color)}
                                            key={color}
                                            className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'border-black border-2' : 'border-gray-300'}`}
                                            style={{ backgroundColor: color.toLowerCase(), filter: 'brightness(0.5)' }}
                                        ></button>
                                    ))}

                                </div>
                            </div>

                            <div className='mb-4'>
                                <p className='text-gray-700'>Size:</p>
                                <div className='flex gap-2 mt-2'>
                                    {selectedProduct.sizes.map((size) => (
                                        <button
                                            onClick={() => setSelectedSize(size)}
                                            key={size}
                                            className={`px-4 py-2 border rounded-lg ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className='mb-6'>
                                <p className='text-gray-700'>Quantity:</p>
                                <div className='flex items-center space-x-4 mt-2'>
                                    <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className='px-4 py-1 bg-gray-200 rounded text-lg'>-</button>
                                    <span className='text-lg'>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className='px-4 py-1 bg-gray-200 rounded text-lg'>+</button>
                                </div>
                            </div>

                            <button onClick={handleAddToCart} disabled={isButtonDisabled} className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'} `}>{isButtonDisabled ? 'Adding...' : 'Add to Cart'}</button>

                            <div className='mt-10 text-gray-700'>
                                <h3 className='text-xl font-bold mb-4 '>Characteristics</h3>
                                <table className='w-full text-left text-sm text-gray-600'>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'>Brand</td>
                                            <td className='py-1'>{selectedProduct.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Material</td>
                                            <td className='py-1'>{selectedProduct.material}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='mt-20'>
                        <h2 className='text-xl text-center font-medium mb-4'>You May Also Like</h2>
                        <ProductsGrid products={similarProducts || []} loading={loading} error={error} />
                    </div>


                </div>
            )}
        </div>
    )
}

export default ProductsDetails