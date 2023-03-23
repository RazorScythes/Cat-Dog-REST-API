import React from 'react'
import { Link } from 'react-router-dom';

//limit the string text by default of 50 characters
const TextWithEllipsis = ({ text, limit = 50 }) => {
    if(!text) return <span></span>;

    if (text.length > limit) {
      return <span>{text.slice(0, limit)}...</span>;
    }

    return <span>{text}</span>;
}

const Cards = ({ image, animals, desc, link = "#", disabled }) => {
  return (
    <div className='w-full border border-solid border-gray-700 bg-gray-800'>
        <img 
            src={image}
            alt="animals"
            className='object-cover w-full h-52'
        />
        <div className='p-4'>
            <h2 className='text-xl font-semibold capitalize mb-2'>{animals}</h2>
            <p className='mb-4'>
                <TextWithEllipsis text={desc}/>
            </p>
            <Link to={link}>
                <button disabled={disabled} className="bg-gray-100 hover:bg-transparent hover:text-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-100 rounded transition-colors duration-300 ease-in-out tracking-tighter disabled:opacity-50">
                    Read More
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Cards