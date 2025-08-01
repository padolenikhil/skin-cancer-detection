
import React from 'react';
import type { LesionGeometry } from '../types';

interface GeometryFormProps {
  geometry: LesionGeometry;
  onGeometryChange: (geometry: LesionGeometry) => void;
}

const SliderInput = <T,>({ label, unit, value, min, max, step, onChange, name }: {
    label: string;
    unit: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: keyof LesionGeometry
}) => (
    <div>
        <label htmlFor={String(name)} className="block text-sm font-medium text-slate-700">
          {label}: <span className="font-bold text-sky-700">{value.toFixed(name === 'irregularity' ? 2 : 0)} {unit}</span>
        </label>
        <input
          id={String(name)}
          name={String(name)}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
    </div>
);


const GeometryForm: React.FC<GeometryFormProps> = ({ geometry, onGeometryChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onGeometryChange({ ...geometry, [name]: parseFloat(value) });
    };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">Lesion Geometry</h3>
      
      <SliderInput
        label="Area"
        unit="mm²"
        value={geometry.area}
        min={1}
        max={200}
        step={1}
        onChange={handleChange}
        name="area"
      />

      <SliderInput
        label="Perimeter"
        unit="mm"
        value={geometry.perimeter}
        min={1}
        max={100}
        step={1}
        onChange={handleChange}
        name="perimeter"
      />

      <SliderInput
        label="Irregularity Index"
        unit=""
        value={geometry.irregularity}
        min={0}
        max={1}
        step={0.01}
        onChange={handleChange}
        name="irregularity"
      />
    </div>
  );
};

export default GeometryForm;
