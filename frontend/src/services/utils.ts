import { v4 as uuidv4 } from 'uuid';

// Function to generate a UUID
export const generateUUID = (): string => {
  return uuidv4();
};

// src/services/utils.ts
export const urlToFile = async (url: string, filename: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

