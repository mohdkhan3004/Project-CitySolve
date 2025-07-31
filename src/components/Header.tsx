import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, FileText, Search, Eye, Info } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 sticky top-0 z-50 shadow-2xl">
      <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="flex items-center mb-4 md:mb-0 space-x-4 group">
          <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-yellow-300 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Building2 className="text-blue-900 text-4xl" size={32} />
          </div>
          <h1 className="text-5xl font-extrabold tracking-wide text-white drop-shadow-lg">
            CitySolve {isAdmin && <span className="text-yellow-400">Admin</span>}
          </h1>
        </Link>
        
        {!isAdmin ? (
          <nav className="flex space-x-8 text-xl font-semibold">
            <button
              onClick={() => scrollToSection('submit')}
              className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-100 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
            >
              <FileText size={20} />
              <span>Submit</span>
            </button>
            <button
              onClick={() => scrollToSection('track')}
              className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-100 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
            >
              <Search size={20} />
              <span>Track</span>
            </button>
            <button
              onClick={() => scrollToSection('search')}
              className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-100 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
            >
              <Eye size={20} />
              <span>Browse</span>
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-100 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
            >
              <Info size={20} />
              <span>About</span>
            </button>
            <Link
              to="/admin"
              className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-all duration-300 font-bold"
            >
              <Building2 size={20} />
              <span>Admin</span>
            </Link>
          </nav>
        ) : (
          <nav className="flex space-x-8 text-xl font-semibold">
            <Link
              to="/"
              className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-100 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
            >
              <Building2 size={20} />
              <span>User Portal</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;