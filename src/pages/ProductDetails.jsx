import React, { useEffect, useRef, useState } from 'react'
import SliderImport from "react-slick";
const Slider = SliderImport.default || SliderImport;
import "slick-carousel/slick/slick.css";
import { NextArrow, PrevArrow } from '../components/ui/Arrows';
import { useGetProductDetailsQuery } from '../services/api';
import { useParams } from 'react-router-dom';



const ProductDetails = () => {
  const { id } = useParams();

  const { data } = useGetProductDetailsQuery(id);

  console.log(data);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  const settingsLarge = {
    dots: false,
    slideToshow: 1,
    arrows: false,
  };
  const settingsSmall = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />


  };
  return (
    <section className='py-12'>
      <div className="container grid grid-cols-2">
        <div className='grid grid-cols-4 gap-10'>
          <Slider className="max-w-xl col-span-3" {...settingsLarge} asNavFor={nav2} ref={slider => (sliderRef1 = slider)}>
            {
              data?.images.map((item) => (

                <div key={item}>
                  <img src={item} alt="" className='w-full' />
                </div>
              ))
            }
           
          </Slider>

          <Slider
            asNavFor={nav1}
            ref={slider => (sliderRef2 = slider)}
            slidesToShow={3}
            swipeToSlide={true}
            focusOnSelect={true}
            {...settingsSmall}
            className="w-full"
          >
              {
              data?.images.map((item) => (

                <div key={item}>
                  <img src={item} alt="" className='w-full' />
                </div>
              ))
            }

          </Slider>
        </div>
        <div className='space-y-4'>
          <h1 className='text-4xl'>{data?.title}</h1>
          <p className='w-[550px]'>{data?.description}</p>
          <div className='flex gap-4'>
            <p className='text-2xl'>${data?.price}</p>


          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails