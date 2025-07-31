import React from 'react';
import { Megaphone } from 'lucide-react';

interface HeroProps {
  onReportClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onReportClick }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-background bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl mx-6 mt-8 mb-16 relative">
        {/* Animated background glow */}
        <div className="absolute inset-0 hero-glow opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center py-24 px-8">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
            Report Local Issues.
            <br />
            <span className="text-yellow-400 drop-shadow-2xl">Make a Difference.</span>
          </h2>
          <p className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
            Empower your community by reporting potholes, garbage problems, street light outages, 
            stray dog concerns, and more through our intelligent reporting platform.
          </p>
          <button
            onClick={onReportClick}
            className="btn-glow bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-black px-12 py-6 rounded-full text-2xl inline-flex items-center space-x-4 shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <span>Report an Issue Now</span>
            <Megaphone size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;