
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const StethoscopeIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.8 2.3A.3.3 0 1 0 5.4 2a2.3 2.3 0 0 1 4.2 0"/>
    <path d="M9.6 2.3A.3.3 0 1 0 10.2 2a2.3 2.3 0 0 1 4.2 0"/>
    <path d="M12.6 2a.3.3 0 1 0 .6.1"/>
    <path d="M5.1 2.6V5c0 1 .7 2 1.6 2H10"/>
    <path d="M14.4 2.1c.2.1.5.2.6.4"/>
    <path d="M10 7h4.5c.8 0 1.5.7 1.5 1.5v1.2c0 .4.1.7.4.9l.4.4c.2.2.2.6 0 .8l-.4.4c-.3.2-.4.6-.4.9v1.2c0 .8-.7 1.5-1.5 1.5h-3.6c-.9 0-1.8.3-2.5 1L7 19"/>
    <path d="M12.5 16.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
  </svg>
);

export const UploadIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export const CameraIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
    </svg>
);

export const XCircleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export const ShieldExclamationIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5.02.998.998 0 002 6v4a1 1 0 00.553.894l4.553 2.277a11.954 11.954 0 011.789 1.139l.235.124a1 1 0 001.714 0l.235-.124a11.954 11.954 0 011.789-1.139l4.553-2.277A1 1 0 0018 10V6a.998.998 0 00-.166-.98A11.954 11.954 0 0110 1.944zM9 13a1 1 0 112 0v-1a1 1 0 11-2 0v1zm1-4a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2.161l-1.071 2.182-2.404.35a1 1 0 00-.554 1.705l1.739 1.695-.41 2.395a1 1 0 001.451 1.054L5 10.83l2.14.933a1 1 0 001.054-1.451l-.41-2.395 1.74-1.695a1 1 0 00-.554-1.705l-2.403-.35L6.055 2.58a1 1 0 00-1.054-.419zM15 2.161l-1.071 2.182-2.404.35a1 1 0 00-.554 1.705l1.739 1.695-.41 2.395a1 1 0 001.451 1.054L15 10.83l2.14.933a1 1 0 001.054-1.451l-.41-2.395 1.74-1.695a1 1 0 00-.554-1.705l-2.403-.35L16.055 2.58a1 1 0 00-1.054-.419zM5 12.161l-1.071 2.182-2.404.35a1 1 0 00-.554 1.705l1.739 1.695-.41 2.395a1 1 0 001.451 1.054L5 20.83l2.14.933a1 1 0 001.054-1.451l-.41-2.395 1.74-1.695a1 1 0 00-.554-1.705l-2.403-.35L6.055 12.58a1 1 0 00-1.054-.419z" />
  </svg>
);

export const InfoIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12v-.008z" />
    </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

export const ServerIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
);

export const GaugeIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M12 12l0 3.5"></path>
        <path d="M15 9l-3 3"></path>
    </svg>
);

export const ClipboardCheckIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <path d="m9 14 2 2 4-4"></path>
    </svg>
);
