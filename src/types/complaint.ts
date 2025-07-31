export interface Complaint {
  id: string;
  name: string;
  email: string;
  phone?: string;
  ward?: string;
  type: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  image?: string | null;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  date: string;
  createdAt: Date;
}

export interface StatusUpdate {
  date: Date;
  text: string;
  status: string;
}