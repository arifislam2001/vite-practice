import React from 'react'
import { FaChevronRight } from 'react-icons/fa'

import { IoShirt } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useGetCatagoryListQuery } from '../../services/api'

const Catagory = () => {
  const {data ,isLoading } = useGetCatagoryListQuery();

  return (
    <section>
        <div className="container py-12">
           <div>
             <h2 className='text-2xl'>Category</h2>
           </div>
        <div className='mt-8 grid grid-cols-5 gap-5 '>
            {
              isLoading
              ?
              <p>Loading Category.....</p>
              :
                data?.map((item)=>(
                 
            <Link to={`/shop?category=${item}`} className='flex  items-center  justify-between  shadow  p-4 rounded-xl'>
               
              <div className='flex items-center'>
            
              <p className='pl-4 pr-4 text-base'>{item}</p>
              </div>
           <FaChevronRight />



            </Link>
                ))
            }
        </div>
        </div>
    </section>
  )
}

export default Catagory
