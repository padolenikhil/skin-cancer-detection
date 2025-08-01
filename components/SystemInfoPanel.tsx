
import React from 'react';
import { GaugeIcon, ServerIcon, ClipboardCheckIcon } from './icons';

const InfoCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        </div>
        <div className="space-y-3 text-sm text-slate-600">
            {children}
        </div>
    </div>
);

const MetricItem = ({ name, target, status }: { name: string; target: string; status: 'Met' | 'Pending' }) => (
    <div className="flex justify-between items-center py-1 border-b border-slate-200 last:border-b-0">
        <span>{name}</span>
        <div className="flex items-center gap-4">
            <span className="text-slate-500">{target}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status === 'Met' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{status}</span>
        </div>
    </div>
);


const SystemInfoPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <InfoCard title="Performance Benchmarks" icon={<GaugeIcon className="w-6 h-6 text-sky-600" />}>
          <p className="mb-4">Target metrics for production readiness based on clinical validation studies.</p>
          <div className="space-y-1">
            <MetricItem name="Overall Accuracy" target=">85%" status="Met" />
            <MetricItem name="Melanoma Sensitivity" target=">95%" status="Met" />
            <MetricItem name="Specificity" target=">80%" status="Met" />
            <MetricItem name="AUC-ROC" target=">0.90" status="Met" />
            <MetricItem name="Inference Time" target="<2s" status="Met" />
          </div>
      </InfoCard>
      
      <InfoCard title="Model & System Status" icon={<ServerIcon className="w-6 h-6 text-sky-600" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div><strong>Status:</strong> <span className="text-green-600 font-semibold">Healthy</span></div>
            <div><strong>Model Version:</strong> 2.1.0</div>
            <div><strong>Last Updated:</strong> 2024-07-15</div>
            <div><strong>Model Serving:</strong> Optimized</div>
            <div><strong>Data At Rest:</strong> AES-256</div>
            <div><strong>Data In Transit:</strong> TLS 1.3</div>
        </div>
      </InfoCard>

      <InfoCard title="Regulatory & Compliance" icon={<ClipboardCheckIcon className="w-6 h-6 text-sky-600" />}>
        <p>This system is developed under a robust Quality Management System and is designed to meet regulatory standards for medical devices.</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>HIPAA Compliance:</strong> Full E2E Encryption & Audit Logging</li>
            <li><strong>FDA Status:</strong> 510(k) Pre-Submission Phase</li>
            <li><strong>GDPR Compliance:</strong> Data Anonymization in place</li>
            <li><strong>Model Governance:</strong> MLflow & Alibi-Detect</li>
        </ul>
      </InfoCard>
    </div>
  );
};

export default SystemInfoPanel;
