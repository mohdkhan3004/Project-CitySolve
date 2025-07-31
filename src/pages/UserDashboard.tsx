import React, { useRef } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import InfoCards from '../components/InfoCards';
import ComplaintForm from '../components/ComplaintForm';
import TrackingSection from '../components/TrackingSection';
import BrowseComplaints from '../components/BrowseComplaints';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import type { Complaint } from '../types/complaint';

const UserDashboard = () => {
  const submitSectionRef = useRef<HTMLDivElement>(null);

  const handleReportClick = () => {
    const submitElement = document.getElementById('submit');
    if (submitElement) {
      submitElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleComplaintSubmit = (complaint: Complaint) => {
    console.log('Complaint submitted:', complaint);
    // The ComplaintForm component already handles localStorage saving
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero onReportClick={handleReportClick} />
        <InfoCards />
        
        {/* Community Impact Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 mx-6 rounded-3xl mb-16">
          <div className="container mx-auto px-8 text-center text-white">
            <h3 className="text-4xl font-black mb-8">Building Stronger Communities Together</h3>
            <div className="max-w-4xl mx-auto space-y-6 text-xl leading-relaxed">
              <p>
                CitySolve is more than just a reporting platform — it's a movement towards cleaner, safer, and more connected communities. By reporting issues promptly, you help local authorities prioritize and resolve problems efficiently.
              </p>
              <p>
                Our platform encourages active citizen participation, fostering transparency and accountability. Together, we can create neighborhoods where everyone feels heard and valued.
              </p>
              <p className="text-yellow-300 font-semibold">
                Join thousands of residents who have already made a difference. Your voice matters — let's build a better city, one report at a time.
              </p>
            </div>
          </div>
        </section>

        <div ref={submitSectionRef}>
          <ComplaintForm onSubmit={handleComplaintSubmit} />
        </div>
        <TrackingSection />
        <BrowseComplaints />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;