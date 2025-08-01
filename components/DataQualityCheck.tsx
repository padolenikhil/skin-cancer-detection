
import React from 'react';
import { CheckCircleIcon } from './icons';

const QualityMetric: React.FC<{ metric: string; value: string }> = ({ metric, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-slate-600">{metric}</span>
    <div className="flex items-center gap-1">
      <CheckCircleIcon className="w-4 h-4 text-green-500" />
      <span className="font-semibold text-slate-700">{value}</span>
    </div>
  </div>
);

const DataQualityCheck: React.FC = () => {
  return (
    <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 animate-fade-in">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
      <h4 className="text-sm font-semibold text-slate-800">Simulated Data Quality Check</h4>
      <QualityMetric metric="Resolution" value="Good" />
      <QualityMetric metric="Sharpness" value="Pass" />
      <QualityMetric metric="Brightness" value="Optimal" />
    </div>
  );
};

export default DataQualityCheck;
