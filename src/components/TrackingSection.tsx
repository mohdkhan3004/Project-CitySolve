import React, { useState } from 'react';
import { Search, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import type { Complaint } from '../types/complaint';
import { sampleComplaints } from '../utils/sampleData';

const TrackingSection = () => {
  const [trackingId, setTrackingId] = useState('');
  const [searchResult, setSearchResult] = useState<Complaint | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'in_progress':
        return <AlertCircle className="text-blue-500" size={20} />;
      case 'resolved':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-4 py-2 rounded-full text-sm font-bold";
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-yellow-400 text-blue-900`;
      case 'in_progress':
        return `${baseClasses} bg-blue-600 text-white`;
      case 'resolved':
        return `${baseClasses} bg-green-600 text-white`;
      case 'rejected':
        return `${baseClasses} bg-red-600 text-white`;
      default:
        return `${baseClasses} bg-gray-400 text-white`;
    }
  };

  const formatStatus = (status: string) => {
    if (status === 'in_progress') return 'In Progress';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleTrack = () => {
    if (!trackingId.trim()) {
      alert('Please enter a complaint ID');
      return;
    }

    setIsSearching(true);
    setNotFound(false);

    // Get complaints from localStorage
    let complaints: Complaint[] = [];
    const stored = localStorage.getItem('citysolve_complaints');
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        complaints = Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error('Error parsing stored complaints:', error);
        complaints = [];
      }
    }
    
    // If no stored complaints, use sample data
    if (complaints.length === 0) {
      complaints = [...sampleComplaints];
    }
    
    const found = complaints.find((c: Complaint) => 
      c.id.toLowerCase() === trackingId.toLowerCase()
    );

    setTimeout(() => {
      if (found) {
        setSearchResult(found);
        setNotFound(false);
      } else {
        setSearchResult(null);
        setNotFound(true);
      }
      setIsSearching(false);
    }, 1000);
  };

  const generateStatusUpdates = (complaint: Complaint) => {
    const baseDate = new Date(complaint.createdAt);
    const updates = [
      {
        date: baseDate,
        text: "Complaint registered",
        status: "pending"
      }
    ];

    if (complaint.status !== 'pending') {
      updates.push({
        date: new Date(baseDate.getTime() + 24 * 60 * 60 * 1000),
        text: "Assigned to field officer",
        status: "in_progress"
      });

      if (complaint.status === 'resolved') {
        updates.push({
          date: new Date(baseDate.getTime() + 3 * 24 * 60 * 60 * 1000),
          text: "Issue resolved",
          status: "resolved"
        });
      } else if (complaint.status === 'rejected') {
        updates.push({
          date: new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000),
          text: "Complaint rejected: Requires more information",
          status: "rejected"
        });
      }
    }

    return updates;
  };

  return (
    <section id="track" className="py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl font-black mb-12 text-blue-900 text-center flex items-center justify-center space-x-4">
          <Search size={40} />
          <span>Track Complaint Status</span>
        </h2>

        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-blue-100">
          <div className="mb-12 max-w-2xl mx-auto">
            <label htmlFor="trackingId" className="block text-lg font-semibold text-blue-900 mb-4">
              Enter Complaint ID
            </label>
            <div className="flex rounded-2xl overflow-hidden border-2 border-blue-300 focus-within:border-blue-600">
              <input
                id="trackingId"
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your complaint reference number (e.g., CitySolve-123456)"
                className="flex-grow px-6 py-4 focus:outline-none text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              />
              <button
                onClick={handleTrack}
                disabled={isSearching}
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 font-bold transition-colors disabled:opacity-50"
              >
                {isSearching ? 'Searching...' : 'Track'}
              </button>
            </div>
            
            {/* Sample IDs for demonstration */}
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm font-semibold text-blue-900 mb-2">Try these sample complaint IDs:</p>
              <div className="flex flex-wrap gap-2">
                {sampleComplaints.slice(0, 3).map((complaint) => (
                  <button
                    key={complaint.id}
                    onClick={() => setTrackingId(complaint.id)}
                    className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    {complaint.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isSearching && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
              <p className="text-blue-600 font-medium">Searching for your complaint...</p>
            </div>
          )}

          {notFound && (
            <div className="text-center py-12">
              <XCircle className="mx-auto mb-4 text-red-500" size={48} />
              <p className="text-red-600 font-medium text-lg">Complaint ID not found. Please check and try again.</p>
            </div>
          )}

          {searchResult && !isSearching && (
            <div className="max-w-5xl mx-auto border-2 border-blue-200 rounded-3xl p-8 shadow-xl bg-gradient-to-br from-blue-50 to-white">
              <div className="flex justify-between items-center border-b border-blue-200 pb-6 mb-8">
                <h3 className="text-2xl font-bold text-blue-900">
                  Complaint #{searchResult.id}
                </h3>
                <span className={getStatusBadge(searchResult.status)}>
                  {formatStatus(searchResult.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-blue-600">Issue Type</p>
                    <p className="font-bold text-blue-900 text-lg">{searchResult.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-600">Date Reported</p>
                    <p className="font-bold text-blue-900 text-lg">{searchResult.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-600">Reporter</p>
                    <p className="font-bold text-blue-900 text-lg">{searchResult.name}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-blue-600">Location</p>
                    <p className="font-bold text-blue-900 text-lg">{searchResult.location.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-600">Priority</p>
                    <p className="font-bold text-blue-900 text-lg">{searchResult.priority}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-600">Contact</p>
                    <p className="text-blue-900">{searchResult.email}</p>
                    {searchResult.phone && <p className="text-blue-900">{searchResult.phone}</p>}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-blue-600 mb-2">Description:</h4>
                <p className="text-blue-900 bg-blue-50 p-4 rounded-xl leading-relaxed">
                  {searchResult.description}
                </p>
              </div>

              {searchResult.image && (
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-blue-600 mb-2">Evidence Image:</h4>
                  <img
                    src={searchResult.image}
                    alt="Complaint evidence"
                    className="max-w-full h-auto rounded-2xl shadow-lg border-4 border-yellow-400"
                  />
                </div>
              )}

              <div>
                <h4 className="font-bold text-blue-900 mb-6 text-xl">Status Timeline</h4>
                <div className="space-y-4">
                  {generateStatusUpdates(searchResult).map((update, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(update.status)}
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-blue-900">{update.text}</p>
                        <p className="text-sm text-blue-600">
                          {update.date.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrackingSection;