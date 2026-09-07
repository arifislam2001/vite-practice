import React from 'react'

import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import ProductCard from '../ui/ProductCard'
import { useGetproductsQuery } from '../../services/api'

const FeaturedProducts = () => {
       const { data, isLoading, error } = useGetproductsQuery({
            limit: 20,
            skip: 0,
            
        });
    return (
        <section>
            <div className="container">
                <div className='flex justify-between'>
                    <h2 className='text-2xl'>Featured Product</h2>
                    <Link to="/shop" className='flex items-center gap-2'>
                        <p>View more</p>
                        <FaArrowRightLong />


                    </Link>
                </div>
                <div className='grid grid-cols-4 gap-6 py-8'>
                    {
                        data?.products?.map((item)=>(

                            <ProductCard key={item.id} data={item}/>
                        ))
                    }
              
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts
