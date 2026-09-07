import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ui/input'
import { FaRegUser, FaSearch } from 'react-icons/fa'
import Button from '../ui/Button'
import { CiHeart } from 'react-icons/ci'
import { BsCart4 } from 'react-icons/bs'
import { useGetSearchSuggestionsQuery } from '../../services/api'

const Navbar = () => {
  const [search, setSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()
  const suggestionsRef = useRef(null)

  const { data: suggestionsData } = useGetSearchSuggestionsQuery(search, {
    skip: !search || search.trim().length < 1,
  })

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (product) => {
    navigate(`/shop/${product.id}`)
    setSearch('')
    setShowSuggestions(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className='relative'>
        <nav className='py-8'>
            <div className="container flex justify-between">
                <div>
                   <Link to="/">
                     <img src="/logo.png" alt="logo" />
                   </Link>
                </div>
                <div className='flex bg-[#F1F1F1] items-center w-4xl  h-fit rounded-md '>
                  <div className='relative w-full'>
                    <Input placeholder="I'm looking for..." className='border-none w-full' value={search} onChange={(e)=>{setSearch(e.target.value); setShowSuggestions(true)}} onKeyDown={(e)=> e.key === 'Enter' && handleSearch()} />
                    {showSuggestions && suggestionsData?.products && suggestionsData.products.length > 0 && (
                      <div ref={suggestionsRef} className='absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto'>
                        {suggestionsData.products.map((product) => (
                          <div
                            key={product.id}
                            className='px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 border-b border-gray-100 last:border-b-0'
                            onClick={() => handleSuggestionClick(product)}
                          >
                            <img src={product.thumbnail} alt={product.title} className='w-10 h-10 object-cover rounded' />
                            <div>
                              <p className='text-sm font-medium text-gray-900'>{product.title}</p>
                              <p className='text-xs text-gray-500'>${product.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button variant='primary' className='p-7  rounded-l-none' onClick={handleSearch}>
                    <FaSearch className='text-xl' />

                  </Button>
                </div>
                <div className='flex gap-5'>
                    <Link className='flex items-center gap-2'><FaRegUser className='text-xl'/>Login</Link>
                    <Link className='flex items-center gap-1'><CiHeart className='text-xl'/>Wishlist</Link>
                    <Link to="/shop" className='flex items-center gap-1'><BsCart4 className='text-xl'/>My Cart <span className='bg-amber-600 rounded-full text-white  w-5 h-5 flex justify-center items-center'>1</span></Link>

                </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar