import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Calendar, MapPin } from 'lucide-react';
import type { Complaint } from '../types/complaint';
import { sampleComplaints } from '../utils/sampleData';

const BrowseComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    loadComplaints();
  }, []);

  useEffect(() => {
    filterComplaints();
  }, [complaints, searchTerm, statusFilter]);

  const loadComplaints = () => {
    const stored = localStorage.getItem('citysolve_complaints');
    let allComplaints: Complaint[] = [];
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        allComplaints = Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error('Error parsing stored complaints:', error);
        allComplaints = [];
      }
    }
    
    // If no stored complaints, use sample data
    if (allComplaints.length === 0) {
      allComplaints = [...sampleComplaints];
      localStorage.setItem('citysolve_complaints', JSON.stringify(allComplaints));
    }
    
    // Sort by creation date (newest first)
    allComplaints.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setComplaints(allComplaints);
  };

  const filterComplaints = () => {
    let filtered = complaints;

    if (searchTerm) {
      filtered = filtered.filter(complaint =>
        complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(complaint => complaint.status === statusFilter);
    }

    setFilteredComplaints(filtered);
    setCurrentPage(1);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-bold";
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

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600 font-bold';
      case 'medium':
        return 'text-yellow-600 font-semibold';
      case 'low':
        return 'text-green-600 font-medium';
      default:
        return 'text-gray-600';
    }
  };

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentComplaints = filteredComplaints.slice(startIndex, startIndex + itemsPerPage);

  const handleRowClick = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
  };

  return (
    <section id="search" className="py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl font-black mb-12 text-blue-900 text-center flex items-center justify-center space-x-4">
          <Eye size={40} />
          <span>Browse Recent Issues</span>
        </h2>

        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-blue-100">
          {/* Search and Filter Controls */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
              <input
                type="text"
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-blue-300 rounded-2xl focus:border-blue-600 focus:outline-none text-lg"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-blue-300 rounded-2xl focus:border-blue-600 focus:outline-none text-lg appearance-none"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-blue-600 font-medium">
              Showing {currentComplaints.length} of {filteredComplaints.length} complaints
            </p>
          </div>

          {/* Complaints Table */}
          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="w-full">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">ID</th>
                  <th className="px-6 py-4 text-left font-bold">Type</th>
                  <th className="px-6 py-4 text-left font-bold">Reporter</th>
                  <th className="px-6 py-4 text-left font-bold">Location</th>
                  <th className="px-6 py-4 text-left font-bold">Date</th>
                  <th className="px-6 py-4 text-left font-bold">Priority</th>
                  <th className="px-6 py-4 text-left font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {currentComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-blue-600 font-medium">
                      No complaints found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  currentComplaints.map((complaint) => (
                    <tr
                      key={complaint.id}
                      className="hover:bg-blue-50 transition-colors cursor-pointer"
                      onClick={() => handleRowClick(complaint)}
                    >
                      <td className="px-6 py-4 font-bold text-blue-700">{complaint.id}</td>
                      <td className="px-6 py-4 font-semibold text-blue-900">{complaint.type}</td>
                      <td className="px-6 py-4 text-blue-800">{complaint.name}</td>
                      <td className="px-6 py-4 text-blue-800">{complaint.location.address}</td>
                      <td className="px-6 py-4 text-blue-700">{complaint.date}</td>
                      <td className={`px-6 py-4 ${getPriorityColor(complaint.priority)}`}>
                        {complaint.priority}
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(complaint.status)}>
                          {formatStatus(complaint.status)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-6 py-3 bg-white border-2 border-blue-300 rounded-2xl text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                Previous
              </button>
              <span className="px-6 py-3 text-blue-900 font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-6 py-3 bg-white border-2 border-blue-300 rounded-2xl text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Complaint Details Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-blue-900">
                    Complaint #{selectedComplaint.id}
                  </h3>
                  <button
                    onClick={() => setSelectedComplaint(null)}
                    className="text-blue-600 hover:text-blue-800 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-blue-600" size={16} />
                      <span className="text-sm font-semibold text-blue-600">Date:</span>
                      <span className="font-bold text-blue-900">{selectedComplaint.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="text-blue-600" size={16} />
                      <span className="text-sm font-semibold text-blue-600">Location:</span>
                      <span className="font-bold text-blue-900">{selectedComplaint.location.address}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600">Reporter:</span>
                      <span className="ml-2 font-bold text-blue-900">{selectedComplaint.name}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600">Email:</span>
                      <span className="ml-2 text-blue-900">{selectedComplaint.email}</span>
                    </div>
                    {selectedComplaint.phone && (
                      <div>
                        <span className="text-sm font-semibold text-blue-600">Phone:</span>
                        <span className="ml-2 text-blue-900">{selectedComplaint.phone}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-blue-600">Type:</span>
                      <span className="ml-2 font-bold text-blue-900">{selectedComplaint.type}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600">Priority:</span>
                      <span className={`ml-2 ${getPriorityColor(selectedComplaint.priority)}`}>
                        {selectedComplaint.priority}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600">Status:</span>
                      <span className={`ml-2 ${getStatusBadge(selectedComplaint.status)}`}>
                        {formatStatus(selectedComplaint.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-blue-600 mb-2">Description:</h4>
                  <p className="text-blue-900 bg-blue-50 p-4 rounded-xl leading-relaxed">
                    {selectedComplaint.description}
                  </p>
                </div>

                {selectedComplaint.image && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-blue-600 mb-2">Evidence Image:</h4>
                    <img
                      src={selectedComplaint.image}
                      alt="Complaint evidence"
                      className="max-w-full h-auto rounded-2xl shadow-lg border-4 border-yellow-400"
                    />
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-blue-600 mb-2">Current Status:</h4>
                  <span className={getStatusBadge(selectedComplaint.status)}>
                    {formatStatus(selectedComplaint.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseComplaints;