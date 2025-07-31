import React, { useState } from 'react';
import { Camera, MapPin, User, Mail, Phone, FileText } from 'lucide-react';
import MapComponent from './MapComponent';
import ImageUpload from './ImageUpload';
import { generateComplaintId } from '../utils/complaintUtils';
import type { Complaint } from '../types/complaint';

interface ComplaintFormProps {
  onSubmit: (complaint: Complaint) => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ward: '',
    complaintType: '',
    description: '',
    priority: 'Low' as 'Low' | 'Medium' | 'High'
  });
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (priority: 'Low' | 'Medium' | 'High') => {
    setFormData(prev => ({ ...prev, priority }));
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLocation) {
      alert('Please select a location on the map');
      return;
    }

    if (!formData.name || !formData.email || !formData.complaintType || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    const complaint: Complaint = {
      id: generateComplaintId(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      ward: formData.ward,
      type: formData.complaintType,
      description: formData.description,
      priority: formData.priority,
      location: {
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        address: formData.ward ? `Ward ${formData.ward}` : `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}`
      },
      image: uploadedImage,
      status: 'pending',
      date: new Date().toLocaleDateString('en-GB'),
      createdAt: new Date()
    };

    // Save to localStorage
    const existingComplaints = JSON.parse(localStorage.getItem('citysolve_complaints') || '[]');
    existingComplaints.unshift(complaint);
    localStorage.setItem('citysolve_complaints', JSON.stringify(existingComplaints));

    onSubmit(complaint);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      ward: '',
      complaintType: '',
      description: '',
      priority: 'Low'
    });
    setSelectedLocation(null);
    setUploadedImage(null);
    setIsSubmitting(false);

    alert(`Thank you, ${complaint.name}! Your complaint has been submitted successfully.\nYour reference number is: ${complaint.id}`);
  };

  const generateAIDescription = (type: string, hasImage: boolean): string => {
    if (!hasImage) return '';
    
    const descriptions: Record<string, string> = {
      'Pothole': 'A significant pothole has developed on the road, posing a risk to vehicles and pedestrians alike. Immediate repair is necessary to prevent accidents and traffic disruptions.',
      'Garbage': 'Accumulated garbage in the area is causing unsanitary conditions, attracting pests, and creating unpleasant odors. Timely collection and cleaning are essential for community health.',
      'Street Light': 'The street light in this vicinity is non-functional, resulting in poor visibility during nighttime and increasing safety concerns for residents and commuters.',
      'Water Leakage': 'There is a persistent water leakage causing wastage and damage to the road surface, which may lead to further deterioration and hazards.',
      'Road Damage': 'The road surface is severely damaged and uneven, making travel difficult and unsafe. Prompt maintenance is required to restore safe passage.',
      'Drainage': 'Drainage issues are causing waterlogging and potential health risks due to stagnant water. Immediate attention is needed to prevent flooding and related problems.',
      'Dogs': 'There is a concern regarding stray dogs in the area, which may pose safety risks to residents. Appropriate measures are requested to manage and ensure community safety.',
      'Other': 'An issue has been identified that requires urgent attention to improve the safety and well-being of the community.'
    };

    return descriptions[type] || descriptions['Other'];
  };

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    if (formData.complaintType && !formData.description) {
      const aiDescription = generateAIDescription(formData.complaintType, true);
      setFormData(prev => ({ ...prev, description: aiDescription }));
    }
  };

  return (
    <section id="submit" className="py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl font-black mb-12 text-blue-900 text-center flex items-center justify-center space-x-4">
          <FileText size={40} />
          <span>Submit a Complaint</span>
        </h2>
        
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-blue-100">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center space-x-3">
                  <User size={24} />
                  <span>Personal Information</span>
                </h3>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-blue-900 mb-2">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="w-full px-6 py-4 border-2 border-blue-300 rounded-2xl focus:border-blue-600 focus:outline-none text-lg transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-6 py-4 border-2 border-blue-300 rounded-2xl focus:border-blue-600 focus:outline-none text-lg transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-blue-900 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-12 pr-6 py-4 border-2 border-blue-300 rounded-2xl focus:border-blue-600 focus:outline-none text-lg transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ward" className="block text-sm font-semibold text-blue-900 mb-2">
                    Ward/Area
                  </label>
                  <select
                    id="ward"
                    name="ward"
                    value={formData.ward}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-blue-300 rounded-2xl focus:border-blue-600 focus:outline-none text-lg transition-all"
                  >
                    <option value="">Select your ward</option>
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>Ward {num}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Complaint Details */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center space-x-3">
                  <FileText size={24} />
                  <span>Complaint Details</span>
                </h3>

                <div>
                  <label htmlFor="complaintType" className="block text-sm font-semibold text-blue-900 mb-2">
                    Issue Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="complaintType"
                    name="complaintType"
                    value={formData.complaintType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 border-2 border-blue-300 rounded-2xl focus:border-blue-600 focus:outline-none text-lg transition-all"
                  >
                    <option value="">Select issue type</option>
                    <option value="Pothole">Pothole</option>
                    <option value="Garbage">Garbage Collection</option>
                    <option value="Street Light">Street Light</option>
                    <option value="Water Leakage">Water Leakage</option>
                    <option value="Road Damage">Road Damage</option>
                    <option value="Drainage">Drainage Problem</option>
                    <option value="Dogs">Stray Dogs</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-blue-900 mb-2">
                    Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Describe the issue in detail"
                    className="w-full px-6 py-4 border-2 border-blue-300 rounded-2xl focus:border-blue-600 focus:outline-none text-lg resize-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-4">Priority Level</label>
                  <div className="flex space-x-6">
                    {(['Low', 'Medium', 'High'] as const).map((priority) => (
                      <label key={priority} className="inline-flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={formData.priority === priority}
                          onChange={() => handlePriorityChange(priority)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 transition-all ${
                          formData.priority === priority 
                            ? 'bg-blue-600 border-blue-600' 
                            : 'border-blue-300 hover:border-blue-500'
                        }`}>
                          {formData.priority === priority && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                        <span className={`font-medium ${
                          formData.priority === priority ? 'text-blue-900' : 'text-blue-600'
                        }`}>
                          {priority}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Location and Evidence */}
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center space-x-3">
                <MapPin size={24} />
                <span>Location and Evidence</span>
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-4">
                    Select Location <span className="text-red-600">*</span>
                  </label>
                  <MapComponent
                    onLocationSelect={handleLocationSelect}
                    selectedLocation={selectedLocation}
                  />
                  {selectedLocation && 
                   typeof selectedLocation.lat === 'number' && 
                   typeof selectedLocation.lng === 'number' && (
                    <p className="mt-3 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                      Selected: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                    <Camera size={20} />
                    <span>Upload Image (Optional)</span>
                  </label>
                  <ImageUpload
                    onImageUpload={handleImageUpload}
                    currentImage={uploadedImage}
                    complaintType={formData.complaintType}
                    userName={formData.name}
                    ward={formData.ward}
                    priority={formData.priority}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glow bg-blue-700 hover:bg-blue-800 text-white font-bold px-12 py-4 rounded-full text-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Complaint</span>
                    <FileText size={24} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ComplaintForm;