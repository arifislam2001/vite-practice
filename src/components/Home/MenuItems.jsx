import React from 'react'

const MenuItems = () => {
    const menu = [
        "Women's Fashion",
        "men's Fashion",
        "Kid's Fashion",
        "Home & Lifestyle",
        "Arts & Crafts",
        "Computer & Electronics",
        "Food & Grocery"






    ]
  return (
    <section>
     <div className="container flex justify-between  gap-8">
         {
        menu?.map((item, index)=>(
            <h1 key={index} className='text-xl'>{item}</h1>
        ))
      }
     </div>
    </section>
  )
}

export default MenuItems
