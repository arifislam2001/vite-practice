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

// // export default ApiTest
import React, { useState } from 'react'
import { useRegisterUserMutation } from '../services/api'

const ApiTest = () => {
  const [Fromdata, setFormData] = useState({ username: "", email: "", password: "" });
 const [register, { isLoading }] = useRegisterUserMutation();
  const [message, setmessage] = useState("");

  const handlechange = (e) => {
    setFormData({ ...Fromdata, [e.target.name]: e.target.value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register(Fromdata).unwrap()
      setmessage(res.message)
    } catch (err) {
      setmessage(err?.data?.message || "can't connected server")
    }


  }
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form onSubmit={handlesubmit} className='w-full max-w-sm p-12 bg-white rounded-xl shadow-sm border border-neutral-200'>
        <h1 className='text-xl p-12'>Create account </h1>
        <input
          type="name"
          name='username'
          onChange={handlechange}
          value={Fromdata.username}
          required
          placeholder='username'


          className='w-full px-4 py-2 mb-4 border border-neutral-300 rounded-md outline-none focus:ring-2 focus:ring-neutral-300 '
        />
        <input
          type="email"
          name='email'
          placeholder='Email'
          value={Fromdata.email}
          onChange={handlechange}
          required

          className='w-full px-4 py-2 mb-4 border border-neutral-300 rounded-md outline-none focus:ring-2 focus:ring-neutral-300 '
        />
        <input
          type="password"
          name='password'
          placeholder='Password'
          value={Fromdata.password}
          onChange={handlechange}
          required

          className='w-full px-4 py-2 mb-4 border border-neutral-300 rounded-md outline-none focus:ring-2 focus:ring-neutral-300 '
        />

        <button
          type="submit"
          className='w-full text-sm py-2 text-semibold text-white bg-neutral-900 '
          disabled={isLoading}
          required
         

          >
            {isLoading ? "Registation...." : "Register"}
          
        
          

        </button>
           
          {
            message &&(
              <p className='mt-4 text-sm text-center text-neutral-700'>{message}</p>
            )
              
            
          }
      </form>
    </div>
  )
}

export default ApiTest
