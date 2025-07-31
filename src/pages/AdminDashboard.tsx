import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Clock, CheckCircle, AlertCircle, XCircle, LogOut } from 'lucide-react';
import Header from '../components/Header';
import AdminLogin from '../components/AdminLogin';
import type { Complaint } from '../types/complaint';
import { sampleComplaints } from '../utils/sampleData';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const itemsPerPage = 15;

  useEffect(() => {
    // Check if admin is already logged in
    const adminLoggedIn = localStorage.getItem('citysolve_admin_logged_in');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadComplaints();
      // Listen for storage changes to update in real-time
      const handleStorageChange = () => {
        loadComplaints();
      };
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      filterComplaints();
    }
  }, [complaints, searchTerm, statusFilter, isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('citysolve_admin_logged_in');
    setIsLoggedIn(false);
    setComplaints([]);
    setFilteredComplaints([]);
    setSelectedComplaint(null);
  };

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
        complaint.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(complaint => complaint.status === statusFilter);
    }

    setFilteredComplaints(filtered);
    setCurrentPage(1);
  };

  // If not logged in, show login form
  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

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
    const baseClasses = "px-3 py-1 rounded-full text-xs font-bold inline-block min-w-[80px] text-center";
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

  const getStatsData = () => {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'pending').length;
    const inProgress = complaints.filter(c => c.status === 'in_progress').length;
    const resolved = complaints.filter(c => c.status === 'resolved').length;
    const rejected = complaints.filter(c => c.status === 'rejected').length;

    return { total, pending, inProgress, resolved, rejected };
  };

  const stats = getStatsData();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center flex-grow">
            <h1 className="text-5xl font-black text-blue-900 mb-4">Admin Dashboard</h1>
            <p className="text-xl text-blue-700">Manage and monitor community complaints</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-semibold transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 text-center">
            <div className="text-3xl font-black text-blue-900 mb-2">{stats.total}</div>
            <div className="text-blue-700 font-semibold">Total Complaints</div>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-6 shadow-lg border border-yellow-200 text-center">
            <div className="text-3xl font-black text-yellow-700 mb-2">{stats.pending}</div>
            <div className="text-yellow-700 font-semibold">Pending</div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 shadow-lg border border-blue-200 text-center">
            <div className="text-3xl font-black text-blue-700 mb-2">{stats.inProgress}</div>
            <div className="text-blue-700 font-semibold">In Progress</div>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 shadow-lg border border-green-200 text-center">
            <div className="text-3xl font-black text-green-700 mb-2">{stats.resolved}</div>
            <div className="text-green-700 font-semibold">Resolved</div>
          </div>
          <div className="bg-red-50 rounded-2xl p-6 shadow-lg border border-red-200 text-center">
            <div className="text-3xl font-black text-red-700 mb-2">{stats.rejected}</div>
            <div className="text-red-700 font-semibold">Rejected</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
              <input
                type="text"
                placeholder="Search by ID, type, location, or name..."
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
                  <th className="px-4 py-4 text-left font-bold text-sm">ID</th>
                  <th className="px-4 py-4 text-left font-bold text-sm">Type</th>
                  <th className="px-4 py-4 text-left font-bold text-sm">Reporter</th>
                  <th className="px-4 py-4 text-left font-bold text-sm">Location</th>
                  <th className="px-4 py-4 text-left font-bold text-sm">Date</th>
                  <th className="px-4 py-4 text-left font-bold text-sm">Priority</th>
                  <th className="px-4 py-4 text-left font-bold text-sm">Status</th>
                  <th className="px-4 py-4 text-left font-bold text-sm">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {currentComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-blue-600 font-medium">
                      No complaints found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  currentComplaints.map((complaint) => (
                    <tr
                      key={complaint.id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 py-4 font-bold text-blue-700 text-sm">{complaint.id}</td>
                      <td className="px-4 py-4 font-semibold text-blue-900 text-sm">{complaint.type}</td>
                      <td className="px-4 py-4 text-blue-800 text-sm">{complaint.name}</td>
                      <td className="px-4 py-4 text-blue-800 text-sm">{complaint.location.address}</td>
                      <td className="px-4 py-4 text-blue-700 text-sm">{complaint.date}</td>
                      <td className={`px-4 py-4 text-sm ${getPriorityColor(complaint.priority)}`}>
                        {complaint.priority}
                      </td>
                      <td className="px-4 py-4">
                        <span className={getStatusBadge(complaint.status)}>
                          {formatStatus(complaint.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button 
                          onClick={() => setSelectedComplaint(complaint)}
                          className="btn-glow bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
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
            <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-3xl font-bold text-blue-900">
                    Complaint #{selectedComplaint.id}
                  </h3>
                  <button
                    onClick={() => setSelectedComplaint(null)}
                    className="text-blue-600 hover:text-blue-800 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100 transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-semibold text-blue-600">Reported By:</span>
                      <p className="font-bold text-blue-900 text-lg">{selectedComplaint.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600">Email:</span>
                      <p className="font-medium text-blue-900">{selectedComplaint.email}</p>
                    </div>
                    {selectedComplaint.phone && (
                      <div>
                        <span className="text-sm font-semibold text-blue-600">Phone:</span>
                        <p className="font-medium text-blue-900">{selectedComplaint.phone}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-sm font-semibold text-blue-600">Date:</span>
                      <p className="font-bold text-blue-900">{selectedComplaint.date}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-semibold text-blue-600">Type:</span>
                      <p className="font-bold text-blue-900 text-lg">{selectedComplaint.type}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600">Location:</span>
                      <p className="font-bold text-blue-900">{selectedComplaint.location.address}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600">Priority:</span>
                      <p className={`text-lg ${getPriorityColor(selectedComplaint.priority)}`}>
                        {selectedComplaint.priority}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600">Status:</span>
                      <div className="mt-1">
                        <span className={getStatusBadge(selectedComplaint.status)}>
                          {formatStatus(selectedComplaint.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-blue-600 mb-3">Description:</h4>
                  <div className="bg-blue-50 p-6 rounded-2xl">
                    <p className="text-blue-900 leading-relaxed text-lg">
                      {selectedComplaint.description}
                    </p>
                  </div>
                </div>

                {selectedComplaint.image && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-blue-600 mb-3">Evidence Image:</h4>
                    <img
                      src={selectedComplaint.image}
                      alt="Complaint evidence"
                      className="max-w-full h-auto rounded-2xl shadow-lg border-4 border-yellow-400"
                    />
                  </div>
                )}

                <div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-4">Status Timeline:</h4>
                  <div className="space-y-4">
                    {generateStatusUpdates(selectedComplaint).map((update, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(update.status)}
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold text-blue-900 text-lg">{update.text}</p>
                          <p className="text-blue-600 font-medium">
                            {update.date.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;