
export type Gender = 'Male' | 'Female' | 'Other';
export type LesionLocation = 'Head/Neck' | 'Torso' | 'Arms' | 'Legs' | 'Other';

export interface PatientMetadata {
  age: number;
  gender: Gender;
  location: LesionLocation;
}

export interface ImageData {
    base64: string; // The full data URL: "data:image/jpeg;base64,..."
    mimeType: string;
}

export interface LesionGeometry {
  area: number;
  perimeter: number;
  irregularity: number;
}

export type LesionClass =
  | 'Actinic Keratosis'
  | 'Basal Cell Carcinoma'
  | 'Benign Keratosis'
  | 'Dermatofibroma'
  | 'Melanoma'
  | 'Melanocytic Nevus'
  | 'Vascular Lesion';


export interface DiagnosisResult {
  predictedClass: LesionClass;
  confidence: number;
  uncertainty: number;
  analysis: string;
  triageLevel: 'ROUTINE' | 'HIGH_PRIORITY' | 'URGENT_REVIEW';
  recommendations: string;
}