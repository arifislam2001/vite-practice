import React, { useEffect, useMemo, useState } from 'react'
import SelectInput from '../components/ui/SelectInput'
import ProductCard from '../components/ui/ProductCard'
import { Link,  useSearchParams } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa6';
import { useGetproductsQuery } from '../services/api';
import { Pagination } from '../components/ui/Pagination';




const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  
  const [limit , setlimit] = useState(30);
  const [totalPage , settotalpage] = useState(10);
  const [pageName , setpageName] = useState(1)
  const { data , isLoading , error } = useGetproductsQuery({
    limit ,
     skip : limit * (pageName - 1),
     category,
     search,
  });

 useEffect(()=>{
   if(data?.total){
    settotalpage(Math.ceil(data?.total /limit))
   }
 },[data?.total , limit])

  const sortOption = [
    {
      value: "10",
      label: "10",
    },
    {
      value: "30",
      label: "30",
    },
    {
      value: "50",
      label: "50",
    },
    {
      value: "80",
      label: "80",
    }
  ];
   const catagory = [
         {
           title : "Health & Household",
        
  
         },
         {
           title : "Kids Fashion",
           
         },
         
         {
           title : "Toys",
             
         },
      
      {
        title : "Groceries",
        
      },
      {
        title : "Home & Lifestyle",
        
      },
      {
        title : "Men Fashion",
      
      },
      
      {
        title : "Women’s Fashion",
          
      },
   ]


  return (
  <main className='py-12'>
    <div className="container  grid grid-cols-12 gap-13">
       <div className='col-span-3 py-6 px-4'>
       <h4 className='text-xl font-semibold'>Related Categories</h4>
       <div className='space-y-4 py-4'>
        {
          catagory.map((item)=>(

        <Link to="/" key={item.title} className='block'>
          {item.title}
        </Link>
          ))
        }
       </div>
        <div className='py-14 border-y-2 border-y-secondary/20'>
          <div className='flex justify-between items-center'>
            <h4 className='text-xl'>Filter by Price</h4>
          <FaChevronDown />
          </div>

          <input className='py-7 w-2xs' type="range" />
          <p>Price: ৳1000 - ৳2500 </p>
        </div>
    </div>
    <div className='col-span-9'>
     <div className='flex justify-between'>
       <p className='text-secondary/80'>Showing <span className='text-black font-semibold'>{limit  * (pageName - 1)} - {limit * pageName}</span> of <span className='text-black font-semibold'>{data?.total}</span > product</p>
       <div className='flex gap-4 items-center'>
        <p>Display:</p>
        <SelectInput
          
      
         
          className='grid grid-cols-2 max-w-20'
          
          options={sortOption}
          value={limit} onChange={(e)=>setlimit(e.target.value)}
        
        /> 
       </div>
     </div>
     <div className='grid grid-cols-4 gap-5 py-8'>
      {
        isLoading
        ? 

          <p>Loading products.....</p>
        
        
        :
           data?.products?.map((item)=>(
         
          <ProductCard key={item.id} data={item}  />
        ))
      }
      
     </div>
     <Pagination handleChange={(num)=>setpageName(num)} pageNum={pageName} totalPage={totalPage}/>
    </div>
    </div>
  </main>
  )
}

export default Shop
