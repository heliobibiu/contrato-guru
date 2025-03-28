
/**
 * Utility functions for date handling
 */

// Convert a Date object to a string format for Supabase (YYYY-MM-DD)
export const dateToString = (date: Date | null): string => {
  if (!date) return ''; // Return empty string instead of null
  return date.toISOString().split('T')[0];
};

// Convert a string date from Supabase to a Date object
export const stringToDate = (dateString: string | null): Date | null => {
  if (!dateString) return null;
  return new Date(dateString);
};

// Convert all date fields in an object from Date to string format
export const convertDatesToStrings = <T extends Record<string, any>>(
  obj: T, 
  dateFields: Array<keyof T>
): Record<string, any> => {
  const result = { ...obj };
  dateFields.forEach(field => {
    const value = result[field];
    if (value && Object.prototype.toString.call(value) === '[object Date]') {
      result[field] = dateToString(value as Date) as any;
    }
  });
  return result;
};
