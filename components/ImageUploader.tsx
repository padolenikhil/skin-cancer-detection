
import React, { useState, useCallback, useRef } from 'react';
import type { ImageData } from '../types';
import { UploadIcon, CameraIcon, XCircleIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (imageData: ImageData | null) => void;
  initialImage: string | undefined;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, initialImage }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(initialImage || null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setImageSrc(base64);
        onImageUpload({ base64, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleClearImage = () => {
    setImageSrc(null);
    onImageUpload(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">Lesion Image</label>
      <div className="relative">
        {imageSrc ? (
          <div className="relative group">
            <img src={imageSrc} alt="Lesion preview" className="w-full h-64 object-cover rounded-lg border-2 border-slate-300" />
            <button
              onClick={handleClearImage}
              className="absolute top-2 right-2 p-1 bg-white/70 rounded-full text-slate-700 hover:bg-white hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Remove image"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              isDragging ? 'border-sky-500 bg-sky-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
              <UploadIcon className="w-10 h-10 mb-3 text-slate-400" />
              <p className="mb-2 text-sm text-slate-500">
                <span className="font-semibold text-sky-600 cursor-pointer" onClick={triggerFileInput}>Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-500">PNG, JPG, or WEBP</p>
            </div>
            <input ref={fileInputRef} type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleFileChange} />
          </div>
        )}
      </div>
      {!imageSrc && (
         <button
            onClick={triggerFileInput}
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
         >
            <CameraIcon className="w-5 h-5" />
            Use Camera
          </button>
      )}
    </div>
  );
};

export default ImageUploader;
