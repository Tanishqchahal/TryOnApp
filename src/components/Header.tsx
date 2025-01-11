import { Link } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiUser, FiChevronDown } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Header() {
  const { cartItems } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Home Link */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary hover:text-secondary transition-colors">
              TeeStyle
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="#" className="text-gray-700 hover:text-primary">Men</Link>
            <Link to="#" className="text-gray-700 hover:text-primary">Women</Link>
            <Link to="#" className="text-gray-700 hover:text-primary">Collections</Link>
            <Link to="#" className="text-gray-700 hover:text-primary">Sale</Link>
          </nav>

          {/* Search, Cart and Profile */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <FiSearch className="w-5 h-5 -ml-8 text-gray-500" />
            </div>
            <Link to='/cart'>
              <button className="relative">
                <FiShoppingCart className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
            </Link>
            <div className="relative">
              <button 
                className="flex items-center space-x-1 text-gray-700 hover:text-primary"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FiUser className="w-6 h-6" />
                <FiChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    to="/models"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Models
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}