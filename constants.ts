import type { Gender, LesionLocation, LesionClass } from './types';

export const GENDERS: Gender[] = ['Male', 'Female', 'Other'];
export const LOCATIONS: LesionLocation[] = ['Head/Neck', 'Torso', 'Arms', 'Legs', 'Other'];
export const CLASSES: LesionClass[] = [
  'Actinic Keratosis',
  'Basal Cell Carcinoma',
  'Benign Keratosis',
  'Dermatofibroma',
  'Melanoma',
  'Melanocytic Nevus',
  'Vascular Lesion',
];
