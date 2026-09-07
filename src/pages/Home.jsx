import React from 'react'
import MenuItems from '../components/Home/MenuItems'
import Catagory from '../components/Home/Catagory'

import FeaturedProducts from '../components/Home/FeaturedProducts'
import SmartPhones from '../components/Home/SmartPhones'

const Home = () => {
  return (
    <>
      <MenuItems />
      <Catagory />
      <SmartPhones/>
      <FeaturedProducts />
    </>
  )
}

export default Home
