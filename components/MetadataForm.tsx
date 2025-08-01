
import React from 'react';
import type { PatientMetadata, Gender, LesionLocation } from '../types';
import { GENDERS, LOCATIONS } from '../constants';

interface MetadataFormProps {
  metadata: PatientMetadata;
  onMetadataChange: (metadata: PatientMetadata) => void;
}

const MetadataForm: React.FC<MetadataFormProps> = ({ metadata, onMetadataChange }) => {
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onMetadataChange({ ...metadata, age: parseInt(e.target.value, 10) });
  };

  const handleGenderChange = (gender: Gender) => {
    onMetadataChange({ ...metadata, gender });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onMetadataChange({ ...metadata, location: e.target.value as LesionLocation });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">Patient Metadata</h3>
      
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-slate-700">
          Age: <span className="font-bold text-sky-700">{metadata.age}</span>
        </label>
        <input
          id="age"
          type="range"
          min="1"
          max="100"
          value={metadata.age}
          onChange={handleAgeChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-100 p-1">
          {GENDERS.map((gender) => (
            <button
              key={gender}
              onClick={() => handleGenderChange(gender)}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                metadata.gender === gender ? 'bg-white text-sky-700 shadow-sm' : 'bg-transparent text-slate-600 hover:bg-slate-200'
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-slate-700">Lesion Location</label>
        <select
          id="location"
          value={metadata.location}
          onChange={handleLocationChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MetadataForm;
