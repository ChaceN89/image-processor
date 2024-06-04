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


export const formatDate = (date?: Date | string): string => {
  if (!date) {
    throw new Error("Invalid date");
  }
  
  const parsedDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return parsedDate.toLocaleTimeString([], options);
};