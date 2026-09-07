import React from 'react'
import { BsCart4 } from 'react-icons/bs'
import { IoMdStar } from 'react-icons/io'
import { Link } from 'react-router-dom'


const ProductCard = ({title ,data}) => {
  return (
    <div className='p-3 border border-[#E9E9E9] rounded-2xl'>
      <div className=' rounded-2xl overflow-hidden relative'>
       <Link to={`/shop/${data.id}`}>
          <img src={data?.thumbnail} alt="" className='w-full object-cover'/>
       </Link>
        {
        data?.discountPercentage&&
         <p className='absolute py-1 px-3 top-0 left-0 bg-badge text-white'>-${data?.discountPercentage}</p>
        }
      </div>
        <div className='flex gap-3 items-center mt-2 text-xl'>

        <IoMdStar />
        <IoMdStar />
        <IoMdStar />
        <IoMdStar />
        <IoMdStar />
        <span>{data?.rating}</span>

        </div>
        <h4 className='text-base w-[294px] py-4'>{data?.title}</h4>
        <div className='flex justify-between items-center'>
            <p>{data?.price}</p>
            <button>
                <BsCart4 />
            </button>

        </div>
    </div>
  )
}

export default ProductCard
