import React from 'react';
import type { DiagnosisResult, LesionClass } from '../types';
import { CheckCircleIcon, ShieldExclamationIcon, SparklesIcon, InfoIcon, ShieldCheckIcon, AlertTriangleIcon } from './icons';

interface ResultsDisplayProps {
  result: DiagnosisResult | null;
  isLoading: boolean;
  error: string | null;
}

const SkeletonLoader: React.FC = () => (
    <div className="animate-pulse space-y-6">
        <div className="h-8 bg-slate-200 rounded-md w-1/2"></div>
        <div className="space-y-4">
            <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
            <div className="h-6 bg-slate-200 rounded-md w-full"></div>
            <div className="h-6 bg-slate-200 rounded-md w-5/6"></div>
        </div>
        <div className="h-24 bg-slate-200 rounded-lg w-full"></div>
    </div>
);

const TriageSignal: React.FC<{ level: DiagnosisResult['triageLevel'], recommendation: string }> = ({ level, recommendation }) => {
    const config = {
        ROUTINE: {
            title: 'Triage: Routine',
            Icon: ShieldCheckIcon,
            className: 'bg-green-100 text-green-800 border-green-300',
            iconClassName: 'text-green-600'
        },
        HIGH_PRIORITY: {
            title: 'Triage: High Priority Review',
            Icon: ShieldExclamationIcon,
            className: 'bg-amber-100 text-amber-800 border-amber-300',
            iconClassName: 'text-amber-600'
        },
        URGENT_REVIEW: {
            title: 'Triage: Urgent Review',
            Icon: AlertTriangleIcon,
            className: 'bg-red-100 text-red-800 border-red-300',
            iconClassName: 'text-red-600'
        }
    }[level];

    if (!config) return null;

    return (
        <div className={`border-l-4 p-4 rounded-r-lg ${config.className}`}>
            <div className="flex">
                <div className="py-1"><config.Icon className={`w-6 h-6 mr-4 ${config.iconClassName}`}/></div>
                <div>
                    <p className="font-bold">{config.title}</p>
                    <p className="text-sm">{recommendation}</p>
                </div>
            </div>
        </div>
    );
};


const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading, error }) => {

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
        <InfoIcon className="w-16 h-16 mb-4 text-slate-300"/>
        <h3 className="text-xl font-semibold">Awaiting Diagnosis</h3>
        <p className="mt-2 max-w-sm">Complete the forms on the left and click "Run Diagnosis" to see the AI-powered analysis.</p>
      </div>
    );
  }
  
  const CANCER_CLASSES: LesionClass[] = ['Melanoma', 'Basal Cell Carcinoma', 'Actinic Keratosis'];
  const isCancer = CANCER_CLASSES.includes(result.predictedClass);

  return (
    <div className="space-y-6">
        <div>
            <p className="text-sm font-medium text-sky-600">Cancer Detection</p>
            <div className={`flex items-center gap-4 mt-2 p-4 rounded-lg border ${isCancer ? 'bg-red-50 border-red-200 text-red-900' : 'bg-green-50 border-green-200 text-green-900'}`}>
                {isCancer 
                    ? <AlertTriangleIcon className="w-8 h-8 flex-shrink-0 text-red-500"/> 
                    : <ShieldCheckIcon className="w-8 h-8 flex-shrink-0 text-green-500"/>
                }
                <div>
                    <h3 className="font-bold text-lg">{isCancer ? 'Cancer Detected' : 'No Cancer Detected'}</h3>
                    <p className="text-sm">{isCancer ? 'The model predicts the lesion is malignant or pre-malignant.' : 'The model predicts the lesion is benign.'}</p>
                </div>
            </div>
        </div>
        
        <div>
            <p className="text-sm font-medium text-slate-600">{isCancer ? 'Predicted Type' : 'Diagnosis'}</p>
            <h2 className="text-4xl font-bold text-slate-800 mt-1">{result.predictedClass}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-600">Confidence</p>
                <p className="text-2xl font-bold text-slate-800">{(result.confidence * 100).toFixed(1)}%</p>
            </div>
             <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-600">Uncertainty</p>
                <p className="text-2xl font-bold text-slate-800">{(result.uncertainty * 100).toFixed(1)}%</p>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-sky-500" />
                AI Analysis
            </h3>
            <p className="mt-2 text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-4">{result.analysis}</p>
        </div>
        
        <TriageSignal level={result.triageLevel} recommendation={result.recommendations} />
    </div>
  );
};

export default ResultsDisplay;