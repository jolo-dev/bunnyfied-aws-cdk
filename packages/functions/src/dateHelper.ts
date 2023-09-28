import dateFormat from 'dateformat';

const GERMAN_DATE_FORMAT = 'dd.mm.yyyy';
const US_DATE_FORMAT = 'mm/dd/yyyy';
const UK_DATE_FORMAT = 'dd/mm/yyyy';

// The dateFormat is only available as ESM package
export function getGermanDateString(date: Date): string {
  return dateFormat(date, GERMAN_DATE_FORMAT);
}

export function getUsDateString(date: Date): string {
  return dateFormat(date, US_DATE_FORMAT);
}

export function getUkDateString(date: Date): string {
  return dateFormat(date, UK_DATE_FORMAT);
}
