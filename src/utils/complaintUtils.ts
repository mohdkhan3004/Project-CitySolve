export const generateComplaintId = (): string => {
  const prefix = 'CitySolve';
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomNumber}`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500';
    case 'in_progress':
      return 'bg-blue-500';
    case 'resolved':
      return 'bg-green-500';
    case 'rejected':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export const getPriorityWeight = (priority: string): number => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 3;
    case 'medium':
      return 2;
    case 'low':
      return 1;
    default:
      return 1;
  }
};

export const sortComplaintsByPriority = (complaints: any[]): any[] => {
  return complaints.sort((a, b) => {
    const priorityDiff = getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
    if (priorityDiff !== 0) return priorityDiff;
    
    // If same priority, sort by date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};