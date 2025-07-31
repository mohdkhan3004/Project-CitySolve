import React from 'react';
import { Building2, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 to-yellow-300 rounded-full flex items-center justify-center">
                <Building2 className="text-blue-900" size={24} />
              </div>
              <h3 className="text-3xl font-black">CitySolve</h3>
            </div>
            <p className="text-blue-200 leading-relaxed max-w-md mb-6">
              Empowering citizens to report local issues and collaborate with authorities for cleaner, safer, and more responsive communities.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-yellow-400">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('submit')}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Submit Complaint
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('track')}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Track Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('search')}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Browse Issues
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-yellow-400">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Phone className="text-yellow-400 flex-shrink-0" size={18} />
                <span className="text-blue-200">1800-123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-yellow-400 flex-shrink-0" size={18} />
                <span className="text-blue-200">support@citysolve.org</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                <span className="text-blue-200">
                  City Municipal Office<br />
                  123 Main Street<br />
                  Hyderabad, Telangana 500001
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-12 pt-8 text-center">
          <p className="text-blue-300">
            &copy; 2025 CitySolve. All rights reserved. Made with ❤️ for better communities.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;