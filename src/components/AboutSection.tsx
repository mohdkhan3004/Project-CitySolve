import React from 'react';
import { Users, Target, Award } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-blue-100">
          <h2 className="text-5xl font-black mb-12 text-blue-900 text-center">
            About CitySolve
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Users className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Community Driven</h3>
              <p className="text-blue-700 leading-relaxed">
                Empowering citizens to actively participate in improving their neighborhoods through collaborative reporting.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Target className="text-blue-900" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Smart Solutions</h3>
              <p className="text-blue-700 leading-relaxed">
                Leveraging technology to streamline issue reporting with AI-powered descriptions and intelligent prioritization.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Award className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Proven Results</h3>
              <p className="text-blue-700 leading-relaxed">
                Track record of successful issue resolution with transparent communication and accountability.
              </p>
            </div>
          </div>

          <div className="prose prose-lg mx-auto text-center space-y-6">
            <p className="text-xl text-blue-800 leading-relaxed">
              CitySolve is a revolutionary community-driven platform designed to bridge the gap between citizens and municipal authorities. Our mission is to create cleaner, safer, and more responsive communities through intelligent issue reporting and transparent resolution tracking.
            </p>
            
            <p className="text-lg text-blue-700 leading-relaxed">
              With our advanced mapping technology, AI-powered complaint generation, and real-time status tracking, we ensure that every voice is heard and every issue receives appropriate attention. Our priority-based system helps authorities focus on urgent matters while maintaining comprehensive oversight of all community concerns.
            </p>
            
            <p className="text-lg text-blue-700 leading-relaxed">
              Join thousands of engaged citizens who are making a tangible difference in their neighborhoods. Together, we're building stronger, more accountable communities where everyone has the power to create positive change.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
              <div className="text-3xl font-black text-blue-900 mb-2">1,000+</div>
              <div className="text-blue-700 font-semibold">Issues Resolved</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6">
              <div className="text-3xl font-black text-blue-900 mb-2">24/7</div>
              <div className="text-blue-700 font-semibold">Platform Availability</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
              <div className="text-3xl font-black text-blue-900 mb-2">98%</div>
              <div className="text-blue-700 font-semibold">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;