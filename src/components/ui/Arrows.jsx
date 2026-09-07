import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function NextArrow({ className,  onClick }) {
  return (
    <div
      className={`${className} text-secondary flex justify-center w-3/4 mt-4`}
     
      onClick={onClick}
    >
      <FaChevronDown className='text-xl '/>

    </div>
  );
}

function PrevArrow({ className,  onClick }) {

  return (
    <div
      className={`${className} text-secondary flex justify-center w-3/4 pb-4`}
     
      onClick={onClick}

    >
      <FaChevronUp />

    </div>
  );
}

export {PrevArrow , NextArrow}