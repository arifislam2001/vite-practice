import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useLoginUserMutation,
  useGetnewuserdataQuery,
  useDeleateuserMutation,
  useUpdateUserMutation,
} from '../services/api'

const Login = () => {
  const [login, { isLoading }] = useLoginUserMutation();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const hasToken = !!localStorage.getItem("accessToken");

  // token না থাকলে লিস্ট আনবে না (401 এড়াতে)
  const { data: result, error } = useGetnewuserdataQuery(undefined, { skip: !hasToken });
  const [deleteUser] = useDeleateuserMutation();
  const [updateUser] = useUpdateUserMutation();

  const users = result?.data?.user || [];

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    try {
      const res = await login({
        email: form.get("email"),
        password: form.get("password"),
      }).unwrap();

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.reload(); // নতুন টোকেন দিয়ে লিস্ট আবার লোড হবে
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setMessage(err?.data?.message || "Can't connect to server");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handledelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      console.log("DELETE ERROR:", err);
      alert(err?.data?.message || "Delete failed");
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
      setEditName("");
    } catch (err) {
      console.log("UPDATE ERROR:", err);
      alert(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className='max-w-5xl mx-auto px-4 py-12'>
      {/* Login ফর্ম */}
      <div className='flex justify-center mb-16'>
        <form
          onSubmit={handleLogin}
          className='w-full max-w-sm p-12 bg-white rounded-xl shadow-sm border border-neutral-200'
        >
          <h1 className='text-xl mb-6'>Login</h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className='w-full px-4 py-2 mb-4 border border-neutral-300 rounded-md outline-none'
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className='w-full px-4 py-2 mb-4 border border-neutral-300 rounded-md outline-none'
          />

          <button
            type="submit"
            disabled={isLoading}
            className='w-full text-sm py-2 text-white bg-neutral-900'
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className='w-full mt-3 text-sm py-2 border border-neutral-300'
          >
            Logout
          </button>

          {message && (
            <p className='mt-4 text-sm text-center text-red-600'>{message}</p>
          )}
        </form>
      </div>

      {/* User List (ফর্মের বাইরে) */}
      <h2 className='text-3xl font-bold mb-8'>User List:</h2>

      {!hasToken && (
        <p className='mb-4 text-neutral-600'>Login করলে ইউজার লিস্ট দেখা যাবে।</p>
      )}
      {error && (
        <p className='mb-4 text-red-600'>
          Could not load users (status: {error.status}). Admin হিসেবে login করুন।
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
                  <button type="button" onClick={() => handleUpdate(item.id)}
                    className='bg-green-600 px-4 py-2 text-white rounded-xl'>Save</button>
                  <button type="button" onClick={cancelEdit}
                    className='bg-gray-600 px-4 py-2 text-white rounded-xl'>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h3 className='text-xl font-semibold mb-4'>Name: {item.username}</h3>
                <p className='text-lg mb-2'>Email: {item.email}</p>
                <p className='text-lg mb-2'>Role: {item.role}</p>
                <div className='flex gap-2 mt-4'>
                  <button type="button" onClick={() => startEdit(item)}
                    className='bg-blue-600 px-4 py-2 text-white rounded-xl'>Edit</button>
                  <button type="button" onClick={() => handledelete(item.id)}
                    className='bg-red-600 px-4 py-2 text-white rounded-xl'>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Login