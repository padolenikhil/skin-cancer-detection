
import { GoogleGenAI, Type } from "@google/genai";
import type { PatientMetadata, DiagnosisResult, ImageData, LesionGeometry } from '../types';
import { CLASSES } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: "AIzaSyCt6W_p35L3z0deSuc-7_imN_pG3jcINw8" });

const diagnosisResponseSchema = {
    type: Type.OBJECT,
    properties: {
        predictedClass: {
            type: Type.STRING,
            description: `The predicted skin lesion class. Must be one of the following: ${CLASSES.join(', ')}.`,
            enum: CLASSES,
        },
        confidence: {
            type: Type.NUMBER,
            description: "The model's confidence in the prediction, as a float between 0.0 and 1.0. Higher is more confident.",
        },
        uncertainty: {
            type: Type.NUMBER,
            description: "The model's uncertainty about the prediction, as a float between 0.0 and 0.2. This is like a standard deviation; lower is better.",
        },
        analysis: {
            type: Type.STRING,
            description: "A brief, one to two-sentence technical analysis for the diagnosis, considering all provided data points."
        },
        triageLevel: {
            type: Type.STRING,
            description: "The clinical triage level. Must be one of 'ROUTINE', 'HIGH_PRIORITY', or 'URGENT_REVIEW'.",
            enum: ['ROUTINE', 'HIGH_PRIORITY', 'URGENT_REVIEW'],
        },
        recommendations: {
            type: Type.STRING,
            description: "A short, one-sentence clinical recommendation based on the findings."
        }
    },
    required: ["predictedClass", "confidence", "uncertainty", "analysis", "triageLevel", "recommendations"],
};

export async function runDiagnosis(
  imageData: ImageData,
  metadata: PatientMetadata,
  geometry: LesionGeometry
): Promise<DiagnosisResult> {
  
  if (!imageData.base64 || !imageData.mimeType) {
    throw new Error("Image data is missing or invalid.");
  }
  
  const base64Data = imageData.base64.split(',')[1];
  if (!base64Data) {
      throw new Error("Invalid base64 data format.");
  }

  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: imageData.mimeType,
    },
  };

  const textPart = {
    text: `
      Analyze the following multi-modal data for a skin lesion and provide a diagnosis from one of the following classes: ${CLASSES.join(', ')}.
      
      Patient Metadata:
      - Age: ${metadata.age}
      - Gender: ${metadata.gender}
      - Body Location: ${metadata.location}

      Lesion Geometry (as measured by clinician):
      - Area: ${geometry.area} mm²
      - Perimeter: ${geometry.perimeter} mm
      - Irregularity Index: ${geometry.irregularity.toFixed(2)} (a score from 0 to 1, where higher means more irregular border)

      From the provided image, perform a detailed visual assessment of the lesion. Analyze its asymmetry, border, color, texture, and any other relevant morphological characteristics.
      Integrate the visual assessment from the image with the provided patient metadata and lesion geometry to form a comprehensive analysis. The provided geometry values are important clinical inputs.

      Based on all available data, please perform the diagnosis.
      The output must be a JSON object that strictly follows the provided schema.

      Classify the lesion into one of the specified categories. For example:
      - Melanoma: often highly irregular, varied in color, on sun-exposed areas of older patients. High border irregularity is a strong indicator.
      - Basal Cell Carcinoma: pearly, waxy bump, often with visible blood vessels, on sun-exposed skin.
      - Actinic Keratosis: rough, scaly patch on sun-damaged skin.
      - Benign Keratosis: waxy, "stuck-on" appearance. Typically has a regular border.
      - Melanocytic Nevus: common mole, usually small, symmetrical, and uniform in color. Low border irregularity.
      - Dermatofibroma: small, firm bump, often on legs.
      - Vascular Lesion: red or purple, may be related to blood vessels.

      Estimate your confidence and uncertainty. Reserve high confidence for cases where visually observed features and provided geometry (e.g., high irregularity, specific colors) strongly correlate with the patient metadata for a given diagnosis.
      Finally, provide a clinical triage level and a short, one-sentence clinical recommendation based on the findings. Remember that Melanoma, Basal Cell Carcinoma, and Actinic Keratosis are of highest concern and should typically receive a HIGH_PRIORITY or URGENT_REVIEW triage level, especially when significant border irregularity or other concerning features are visually observed or provided.
    `
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: diagnosisResponseSchema,
        temperature: 0.2, // Lower temperature for more deterministic clinical output
      },
    });

    const jsonText = response.text.trim();
    // In case the API returns the JSON inside a markdown block
    const cleanedJsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
    
    const result = JSON.parse(cleanedJsonText) as DiagnosisResult;
    return result;

  } catch (error) {
    console.error("Error during Gemini API call:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
        throw new Error("The provided API key is not valid. Please check your configuration.");
    }
    throw new Error("The AI model failed to return a valid diagnosis.");
  }
}