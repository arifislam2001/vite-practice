import React from 'react'

import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import ProductCard from '../ui/ProductCard'
import { useGetproductsQuery } from '../../services/api';

const SmartPhones = () => {
    const { data, isLoading, error } = useGetproductsQuery({
        limit: 4,
        skip: 0,
        category: "smartphones",  
    });
    return (
        <section>
            <div className="container">
                <div className='flex justify-between'>
                    <h2 className='text-2xl'>Smart Phones</h2>
                    <Link to="/shop?category=smartphones" className='flex items-center gap-2'>
                        <p>View more</p>
                        <FaArrowRightLong />


                    </Link>
                </div>
                <div className='grid grid-cols-4 gap-6 py-8'>
                    {
                        data?.products?.map((item) => (

                            <ProductCard key={item.id} data={item} />
                        ))
                    }

                </div>
            </div>
        </section>
    )
}

export default SmartPhones
