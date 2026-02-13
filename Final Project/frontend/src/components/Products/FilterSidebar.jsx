// import React, { useEffect, useState } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom'

// const FilterComponent = () => {

//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({
//     category: '',
//     gender: '',
//     color: '',
//     size: [],
//     material: [],
//     brand: [],
//     minPrice: 0,
//     maxPrice: 100,
//   })

//   const [priceRange, setPriceRange] = useState([0, 100]);

//   const categories = ['Top Wear', 'Bottom Wear'];

//   const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Gray'];

//   const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

//   const materials = ['Cotton', 'Polyester', 'Wool', 'Silk', 'Denim', 'Linen', 'Viscose', 'Fleece'];

//   const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour', 'Zara', 'H&M', 'Uniqlo', 'Levi\'s', 'Gucci'];

//   const genders = ['Men', 'Women'];


//   useEffect(() => {

//     const params = Object.fromEntries([...searchParams]);

//     setFilters({
//       category: params.category || '',
//       gender: params.gender || '',
//       color: params.color || '',
//       size: params.size ? params.size.split(',') : [],
//       material: params.material ? params.material.split(',') : [],
//       brand: params.brand ? params.brand.split(',') : [],
//       minPrice: params.minPrice || 0,
//       maxPrice: params.maxPrice || 100,
//     });

//     setPriceRange([0, params.maxPrice || 100]);

//   }, [searchParams]);


//   const handleFilterChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     // const data = {name, value, checked, type};
//     // console.log(data);

//     let newFilters = { ...filters };

//     if (type === 'checkbox') {
//       if (checked) {
//         newFilters[name] = [...(newFilters[name] || []), value];
//       } else {
//         newFilters[name] = newFilters[name].filter((item) => item !== value);
//       }
//     } else {
//       newFilters[name] = value;
//     }

//     setFilters(newFilters);
//     updateURLParams(newFilters);


//     const updateURLParams = () => {
//       const params = new URLSearchParams();
//       Object.keys(newFilters).forEach((key) => {
//         if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
//           params.append(key, newFilters[key].join(','));
//         } else if (newFilters[key]) {
//           params.append(key, newFilters[key]);
//         }
//       });
//       setSearchParams(params);
//       navigate(`?${params.toString()}`);
//     };


//     const handlePriceRangeChange = (e) => {
//       const newPrice = e.target.value;
//       setPriceRange([0, newPrice]);

//       const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
//       setFilters(filters);
//       updateURLParams(newFilters);
//     }


//     return (
//       <div className='p-4'>

//         <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>


//         {/* Category Filter */}
//         <div className='mb-6'>
//           <label className='block text-gray-600 font-medium mb-2'>Category</label>
//           {categories.map((category) => (
//             <div key={category} className='flex items-center mb-1'>
//               <input
//                 type='radio'
//                 name='category'
//                 value={category}
//                 onChange={handleFilterChange}
//                 checked={filters.category === category}
//                 className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
//               />
//               <span className='text-gray-700'>{category}</span>
//             </div>
//           ))}
//         </div>


//         {/* Gender Filter */}
//         <div className='mb-6'>
//           <label className='block text-gray-600 font-medium mb-2'>Gender</label>
//           {genders.map((gender) => (
//             <div key={gender} className='flex items-center mb-1'>
//               <input
//                 type='radio'
//                 name='gender'
//                 value={gender}
//                 onChange={handleFilterChange}
//                 checked={filters.gender === gender}
//                 className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
//               />
//               <span className='text-gray-700'>{gender}</span>
//             </div>
//           ))}
//         </div>


//         {/* Color Filter */}
//         <div className='mb-6'>
//           <label className='block text-gray-600 font-medium mb-2'>Color</label>
//           <div className='flex flex-wrap gap-2'>
//             {colors.map((color) => (
//               <button
//                 name='color'
//                 key={color}
//                 value={color}
//                 onClick={handleFilterChange}
//                 className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer 
//                 transition hover:scale-105 ${filters.color === color ? 'ring-2 ring-blue-500' : ''}`}
//                 style={{ backgroundColor: color.toLowerCase() }}>
//               </button>
//             ))}
//           </div>
//         </div>


//         {/* Size Filter */}
//         <div className='mb-6'>
//           <label className='block text-gray-600 font-medium mb-2'>Size</label>
//           {sizes.map((size) => (
//             <div key={size} className='flex items-center mb-1'>
//               <input
//                 type="checkbox"
//                 name='size'
//                 value={size}
//                 onChange={handleFilterChange}
//                 checked={filters.size.includes(size)}
//                 className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400  border-gray-300" />
//               <span className='text-gray-700'>{size}</span>
//             </div>
//           ))}
//         </div>


//         {/* Material Filter */}
//         <div className='mb-6'>
//           <label className='block text-gray-600 font-medium mb-2'>Material</label>
//           {materials.map((material) => (
//             <div key={material} className='flex items-center mb-1'>
//               <input
//                 type="checkbox"
//                 name='material'
//                 value={material}
//                 onChange={handleFilterChange}
//                 checked={filters.material.includes(material)}
//                 className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
//               <span className='text-gray-700'>{material}</span>
//             </div>
//           ))}
//         </div>


//         {/* Brand Filter */}
//         <div className='mb-6'>
//           <label className='block text-gray-600 font-medium mb-2'>Brand</label>
//           {brands.map((brand) => (
//             <div key={brand} className='flex items-center mb-1'>
//               <input
//                 type="checkbox"
//                 name='brand'
//                 value={brand}
//                 onChange={handleFilterChange}
//                 checked={filters.brand.includes(brand)}
//                 className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
//               <span className='text-gray-700'>{brand}</span>
//             </div>
//           ))}
//         </div>


//         {/* Price Range Filter */}
//         <div className='mb-8'>
//           <label className='block text-gray-600 font-medium mb-2'>Price Range</label>
//           <input
//             type="range"
//             name='priceRange'
//             min={0}
//             max={100}
//             value={priceRange[1]}
//             onChange={handlePriceRangeChange}
//             className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
//           />
//           <div className='flex justify-between text-gray-600 mt-2'>
//             <span>$0</span>
//             <span className='text-gray-700'>${priceRange[1]}</span>
//           </div>
//         </div>


//       </div>
//     )
//   }

// }

// export default FilterComponent




import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
    "Brown",
    "Gray",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Polyester",
    "Wool",
    "Silk",
    "Denim",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Reebok",
    "Under Armour",
    "Zara",
    "H&M",
    "Uniqlo",
    "Levi's",
    "Gucci",
  ];
  const genders = ["Men", "Women"];

  // Sync filters with URL params
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    const updatedFilters = {
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice ? Number(params.minPrice) : 0,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : 100,
    };

    setFilters(updatedFilters);
    setPriceRange([0, updatedFilters.maxPrice]);
  }, [searchParams]);

  // Update URL
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(","));
      } else if (
        newFilters[key] !== "" &&
        newFilters[key] !== 0 &&
        newFilters[key] !== 100
      ) {
        params.set(key, newFilters[key]);
      }
    });

    setSearchParams(params);
  };

  // Handle radio & checkbox
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;

    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...newFilters[name], value];
      } else {
        newFilters[name] = newFilters[name].filter(
          (item) => item !== value
        );
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  // Handle color button separately (since it's a button, not input)
  const handleColorClick = (color) => {
    const newFilters = { ...filters, color };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  // Handle price range
  const handlePriceRangeChange = (e) => {
    const newPrice = Number(e.target.value);

    setPriceRange([0, newPrice]);

    const newFilters = {
      ...filters,
      minPrice: 0,
      maxPrice: newPrice,
    };

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category}>
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
            />
            <span className="ml-2">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender}>
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
            />
            <span className="ml-2">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleColorClick(color)}
              className={`w-8 h-8 rounded-full border ${
                filters.color === color
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size}>
            <input
              type="checkbox"
              name="size"
              value={size}
              checked={filters.size.includes(size)}
              onChange={handleFilterChange}
            />
            <span className="ml-2">{size}</span>
          </div>
        ))}
      </div>

      {/* Material */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material}>
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
            />
            <span className="ml-2">{material}</span>
          </div>
        ))}
      </div>

      {/* Brand */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand}>
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
            />
            <span className="ml-2">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="mb-8">
        <label className="block font-medium mb-2">Price Range</label>
        <input
          type="range"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceRangeChange}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
