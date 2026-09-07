// import React, { useState, useEffect } from 'react'

// const ApiTest = () => {
//   const [products, setProducts] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/api/products')
//         const data = await res.json()
//         setProducts(data)
//       } catch (error) {
//         console.log(error);

//       }
//     }
//     fetchData()
//   }, [])

//   return (
//     <div className='p-6'>
//       {products.map((item) => (
//         <div className='flex gap-6 '>
//           <h1 key={item.id}>{item.title}</h1>
//           <h1>{item.price}</h1>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ApiTest
import React, { useEffect, useState } from 'react'

const ApiTest = () => {
  const [ User , setUserdata] = useState([])

  useEffect(() => {
    const Apidata = async () => {
      try {
        const res = await fetch("http://localhost:8000/alluser")
        const data = await res.json()
         setUserdata(data)
         console.log(data);
         
      } catch (error) {
        console.log(error);

      }
    }
    Apidata()
  }, [])

  return (
    <div>
       {
        User?.map((item)=>(
         <div className='mt-5 m-4 p-4 border w-50 text-white bg-blue-500 rounded-2xl '>
           <h1 key={item.id}>{item.username}</h1>
           <h1 key={item.id}>{item.email}</h1>
           <h1 key={item.id}>{item.password}</h1>

         

         </div>
        ))
       }
    </div>
  )
}

export default ApiTest
