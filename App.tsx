
import React, { useState, useCallback, useMemo } from 'react';
import type { PatientMetadata, DiagnosisResult, ImageData, LesionGeometry } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import MetadataForm from './components/MetadataForm';
import GeometryForm from './components/GeometryForm';
import ResultsDisplay from './components/ResultsDisplay';
import SystemInfoPanel from './components/SystemInfoPanel';
import DataQualityCheck from './components/DataQualityCheck';
import { runDiagnosis } from './services/geminiService';
import { ArrowRightIcon } from './components/icons';

const TabButton = ({ name, active, onClick }: { name: string; active: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 -mb-px transition-colors ${
            active
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
        }`}
    >
        {name}
    </button>
);


const App: React.FC = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [metadata, setMetadata] = useState<PatientMetadata>({
    age: 45,
    gender: 'Male',
    location: 'Torso',
  });
  const [geometry, setGeometry] = useState<LesionGeometry>({
    area: 25,
    perimeter: 15,
    irregularity: 0.6,
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'system'>('diagnosis');

  const isFormComplete = useMemo(() => {
    return imageData && metadata && geometry;
  }, [imageData, metadata, geometry]);

  const handleDiagnose = useCallback(async () => {
    if (!isFormComplete || !imageData) return;

    setIsLoading(true);
    setError(null);
    setDiagnosisResult(null);
    setActiveTab('diagnosis');

    try {
      const result = await runDiagnosis(imageData, metadata, geometry);
      setDiagnosisResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to get diagnosis. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isFormComplete, imageData, metadata, geometry]);
  
  const handleReset = () => {
    setImageData(null);
    setMetadata({ age: 45, gender: 'Male', location: 'Torso' });
    setGeometry({ area: 25, perimeter: 15, irregularity: 0.6 });
    setDiagnosisResult(null);
    setError(null);
    setIsLoading(false);
    setActiveTab('diagnosis');
  };


  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          
          {/* Input Section */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Patient & Lesion Data</h2>
            <div className="space-y-8">
              <div>
                <ImageUploader onImageUpload={setImageData} initialImage={imageData?.base64} />
                {imageData && <DataQualityCheck />}
              </div>
              <MetadataForm metadata={metadata} onMetadataChange={setMetadata} />
              <GeometryForm geometry={geometry} onGeometryChange={setGeometry} />
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 flex flex-col">
              <div className="border-b border-slate-200">
                <div className="flex space-x-2">
                  <TabButton name="Diagnosis" active={activeTab === 'diagnosis'} onClick={() => setActiveTab('diagnosis')} />
                  <TabButton name="System Info" active={activeTab === 'system'} onClick={() => setActiveTab('system')} />
                </div>
              </div>
              
              <div className="flex-grow pt-6">
                 {activeTab === 'diagnosis' ? (
                    <ResultsDisplay result={diagnosisResult} isLoading={isLoading} error={error} />
                 ) : (
                    <SystemInfoPanel />
                 )}
              </div>

              {activeTab === 'diagnosis' && (
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDiagnose}
                    disabled={!isFormComplete || isLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-8 py-4 text-white font-semibold shadow-md hover:bg-sky-700 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {isLoading ? 'Analyzing...' : 'Run Diagnosis'}
                    {!isLoading && <ArrowRightIcon />}
                  </button>
                  <button
                      onClick={handleReset}
                      className="w-full sm:w-auto rounded-lg bg-slate-200 px-8 py-4 text-slate-700 font-semibold hover:bg-slate-300 transition-all"
                  >
                      Reset
                  </button>
                </div>
              )}
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>This is a demonstration application. Not for clinical use.</p>
      </footer>
    </div>
  );
};

export default App;