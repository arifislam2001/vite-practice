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
import {
  useDeleateuserMutation,
  useGetnewuserdataQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
} from '../services/api'

const ApiTest = () => {
  const [register, { isLoading }] = useRegisterUserMutation();
  const [message, setmessage] = useState("");
  const { data: result, error } = useGetnewuserdataQuery();
  const [deleteUser] = useDeleateuserMutation();
  const [updateUser] = useUpdateUserMutation();

  const users = result?.data?.user || [];
  console.log("USERS RESULT:", result, "ERROR:", error);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const handledelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditName(item.username);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
  };

  const handleUpdate = async (id) => {
    try {
      await updateUser({ id, username: editName }).unwrap();
      setEditId(null);
    } catch (err) {
      alert("Update failed");
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const body = {
      username: form.get("username"),
      email: form.get("email"),
      password: form.get("password"),
      gender: form.get("gender"),
    };

    try {
      const res = await register(body).unwrap();
      setmessage(res.message);
      e.target.reset();
    } catch (err) {
      console.log("REGISTER ERROR:", err);
      setmessage(err?.data?.message || "can't connected server");
    }
  };

  return (
    <>
      <div className='min-h-screen flex items-center justify-center'>
        <form onSubmit={handlesubmit} className='w-full max-w-sm p-12 bg-white rounded-xl shadow-sm border border-neutral-200'>
          <h1 className='text-xl p-12'>Create account</h1>

          <input
            type="text"
            name='username'
            required
            placeholder='username'
            className='w-full px-4 py-2 mb-4 border border-neutral-300 rounded-md outline-none focus:ring-2 focus:ring-neutral-300'
          />
          <input
            type="email"
            name='email'
            placeholder='Email'
            required
            className='w-full px-4 py-2 mb-4 border border-neutral-300 rounded-md outline-none focus:ring-2 focus:ring-neutral-300'
          />
          <input
            type="password"
            name='password'
            placeholder='Password'
            required
            className='w-full px-4 py-2 mb-4 border border-neutral-300 rounded-md outline-none focus:ring-2 focus:ring-neutral-300'
          />
          <select
            name="gender"
            required
            className='w-full px-4 py-2 mb-4 border border-neutral-300 rounded-md outline-none'
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button
            type="submit"
            className='w-full text-sm py-2 text-semibold text-white bg-neutral-900'
            disabled={isLoading}
          >
            {isLoading ? "Registration...." : "Register"}
          </button>

          {message && (
            <p className='mt-4 text-sm text-center text-neutral-700'>{message}</p>
          )}
        </form>
      </div>

      <div className='max-w-5xl mx-auto px-4'>
        <h2 className='text-3xl font-bold mb-8'>User List:</h2>

        {error && (
          <p className='mb-4 text-red-600'>
            Could not load users (status: {error.status}). Login as admin first.
          </p>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {users.map((item) => (
            <div
              key={item.id}
              className='bg-gradient-to-b from-purple-600 to-purple-400 rounded-2xl p-8 text-white shadow-lg'
            >
              {editId === item.id ? (
                <>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className='w-full px-3 py-2 mb-4 rounded-md text-black outline-none'
                  />
                  <p className='text-lg mb-2'>Email: {item.email}</p>
                  <div className='flex gap-2 mt-4'>
                    <button onClick={() => handleUpdate(item.id)} className='bg-green-600 px-4 py-2 text-white rounded-xl'>Save</button>
                    <button onClick={cancelEdit} className='bg-gray-600 px-4 py-2 text-white rounded-xl'>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className='text-xl font-semibold mb-4'>Name: {item.username}</h3>
                  <p className='text-lg mb-2'>Email: {item.email}</p>
                  <p className='text-lg mb-2'>Role: {item.role}</p>
                  <img
                    src={item.profilePicture || 'https://via.placeholder.com/80?text=No+Image'}
                    alt="profile"
                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div className='flex gap-2 mt-4'>
                    <button onClick={() => startEdit(item)} className='bg-blue-600 px-4 py-3 text-white rounded-xl'>Edit</button>
                    <button onClick={() => handledelete(item.id)} className='bg-red-600 px-4 py-2 text-white rounded-xl'>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ApiTest