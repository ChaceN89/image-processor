import { v4 as uuidv4 } from 'uuid';

// Function to generate a UUID
export const generateUUID = (): string => {
  return uuidv4();
};

// Add more utility functions here

// Example utility function to format a date
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Example utility function to capitalize a string
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};