import type { Complaint } from '../types/complaint';

export const sampleComplaints: Complaint[] = [
  {
    id: 'CitySolve-123456',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    ward: '3',
    type: 'Pothole',
    description: 'A significant pothole has developed on the road, posing a risk to vehicles and pedestrians alike. Immediate repair is necessary to prevent accidents and traffic disruptions.',
    priority: 'High',
    location: {
      lat: 17.385044,
      lng: 78.486671,
      address: 'Ward 3'
    },
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'pending',
    date: new Date().toLocaleDateString('en-GB'),
    createdAt: new Date()
  },
  {
    id: 'CitySolve-123457',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 87654 32109',
    ward: '5',
    type: 'Garbage',
    description: 'Accumulated garbage in the area is causing unsanitary conditions, attracting pests, and creating unpleasant odors. Timely collection and cleaning are essential for community health.',
    priority: 'Medium',
    location: {
      lat: 17.395044,
      lng: 78.496671,
      address: 'Ward 5'
    },
    image: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'in_progress',
    date: new Date(Date.now() - 86400000).toLocaleDateString('en-GB'), // Yesterday
    createdAt: new Date(Date.now() - 86400000)
  },
  {
    id: 'CitySolve-123458',
    name: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '+91 76543 21098',
    ward: '7',
    type: 'Street Light',
    description: 'The street light in this vicinity is non-functional, resulting in poor visibility during nighttime and increasing safety concerns for residents and commuters.',
    priority: 'Medium',
    location: {
      lat: 17.375044,
      lng: 78.476671,
      address: 'Ward 7'
    },
    image: null,
    status: 'resolved',
    date: new Date(Date.now() - 172800000).toLocaleDateString('en-GB'), // 2 days ago
    createdAt: new Date(Date.now() - 172800000)
  },
  {
    id: 'CitySolve-123459',
    name: 'Sunita Reddy',
    email: 'sunita.reddy@email.com',
    phone: '+91 65432 10987',
    ward: '2',
    type: 'Water Leakage',
    description: 'There is a persistent water leakage causing wastage and damage to the road surface, which may lead to further deterioration and hazards.',
    priority: 'High',
    location: {
      lat: 17.405044,
      lng: 78.506671,
      address: 'Ward 2'
    },
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'pending',
    date: new Date(Date.now() - 259200000).toLocaleDateString('en-GB'), // 3 days ago
    createdAt: new Date(Date.now() - 259200000)
  },
  {
    id: 'CitySolve-123460',
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 54321 09876',
    ward: '4',
    type: 'Road Damage',
    description: 'The road surface is severely damaged and uneven, making travel difficult and unsafe. Prompt maintenance is required to restore safe passage.',
    priority: 'High',
    location: {
      lat: 17.415044,
      lng: 78.516671,
      address: 'Ward 4'
    },
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'in_progress',
    date: new Date(Date.now() - 345600000).toLocaleDateString('en-GB'), // 4 days ago
    createdAt: new Date(Date.now() - 345600000)
  }
];