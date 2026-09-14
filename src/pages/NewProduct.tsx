import React from 'react'
import { FaChevronRight } from 'react-icons/fa'

import { IoShirt } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useGetnewuserdataQuery } from '../services/api'



const NewProduct = () => {
  const { data ,isLoading } = useGetnewuserdataQuery();
  console.log(data);
  
   

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
                 
            <Link key={item.id} className='flex  items-center  justify-between  shadow  p-4 rounded-xl'>
               
              <div className='flex items-center'>
            
              <p className='pl-4 pr-4 text-base'>{item.username}</p>
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

export default NewProduct
