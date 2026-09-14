import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import ApiTest from './pages/ApiTest'
import AddProductForm from './pages/AddProductForm'
import RegistrationForm from './pages/RegistrationForm'
import NewProduct from './pages/NewProduct'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='api' element={<ApiTest />} />
        <Route path='register' element={<RegistrationForm />} />
        <Route path='newproduct' element={<NewProduct/>} />
        
        <Route path='add-product' element={<AddProductForm/>} /> 
        <Route path='/' element={<Layout />} >
         <Route index element={<Home/>}/>
         <Route path="/shop" element={<Shop/>}/>
         <Route path="/shop/:id" element={<ProductDetails/>}/>
        </Route>
       
      </Routes>
   </BrowserRouter>
  )
}

export default App