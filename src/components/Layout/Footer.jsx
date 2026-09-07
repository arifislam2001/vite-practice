import React from 'react'

const Footer = () => {
  const Link = [
    "About us",
    "Contact us",
    "Products",
    "Login",
    "Sign Up"
  
  ]
  ;
  const customer = [
    " My Account",
    "Orders",
    "Terms",
    "Privacy Policy",
    "Shipping Information"
  ]
  return (
    <section>
      <div className="container flex justify-between">
        <div>
          <img src="/logo.png" alt="" />
          <p className='text-xl w-[390px] py-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>


        </div>

        <div>
          <h4>QUICK LINKS</h4>
           <div className='mt-4'>
            {
            Link.map((item)=>(
            <h4>{item}</h4>
            ))
          }
           </div>
        </div>
        <div >
          <h4>CUSTOMER AREA</h4>
          <div className='mt-4'>
            {
              customer.map((item)=>(
                <h4>{item}</h4>
              ))
            }
          </div>
        </div>
        <div>
          <h4>CONTACT</h4>
          <p className='w-[334px] text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
        </div>
      </div>
    </section>
  )
}

export default Footer
