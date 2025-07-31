import React, { useState, useRef } from 'react';
import { Camera, X, FileText } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage: string | null;
  complaintType: string;
  userName: string;
  ward: string;
  priority: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  currentImage,
  complaintType,
  userName,
  ward,
  priority
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [showAILetter, setShowAILetter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageUpload(result);
        setShowAILetter(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    onImageUpload('');
    setShowAILetter(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generateAILetter = () => {
    const name = userName || '[Your Name]';
    const location = ward ? `Ward ${ward}` : 'the specified location on the map';
    const issueType = complaintType || '[Issue Type]';
    
    return `To Whom It May Concern,

I, ${name}, am writing to formally report a ${issueType.toLowerCase()} issue located in ${location}. This matter is of ${priority.toLowerCase()} priority and requires immediate attention to ensure the safety and well-being of our community.

The attached image provides clear evidence of the situation and will help the concerned authorities better understand the severity of the issue and expedite the resolution process.

I kindly request prompt action to resolve this matter and prevent any potential hazards or inconvenience to residents and commuters in the area.

Thank you for your attention to this important matter.

Sincerely,
${name}`;
  };

  return (
    <div className="space-y-6">
      {!currentImage ? (
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
            dragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera size={48} className="mx-auto mb-4 text-blue-400" />
          <p className="text-blue-600 font-medium mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-blue-400">
            PNG, JPG, GIF up to 10MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={currentImage}
              alt="Uploaded complaint evidence"
              className="w-full max-h-64 object-cover rounded-2xl shadow-lg border-4 border-yellow-400"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          
          {showAILetter && complaintType && userName && (
            <div className="bg-gradient-to-br from-blue-50 to-yellow-50 border-4 border-yellow-400 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="text-blue-600" size={20} />
                <h4 className="font-bold text-blue-900">AI-Generated Formal Letter</h4>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-blue-900 font-medium leading-relaxed">
                  {generateAILetter()}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;