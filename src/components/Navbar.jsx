import React from 'react'
import { Link } from 'react-router-dom';
import { nav_links } from "../constants";

const Navbar = () => {
  return (
    <nav className="relative bg-gray-800 p-6">
      <div className="container mx-auto block">
        <div className="flex flex-row items-center lg:flex-grow">
          {
            nav_links.map((nav_item, i) => {
                return (
                  <Link key={i} to={`${nav_item.path}`} className="text-white hover:text-blue-200 mr-4">
                    {nav_item.name}
                  </Link>
                )
            })
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar