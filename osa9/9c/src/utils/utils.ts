import { NewPatient, Gender } from "../types";

const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
      const newPatient: NewPatient = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation)

        };
    
      return newPatient;
    } else {
        throw new Error('Incorrect data: some fields are missing');
    }
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gend: string): gend is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gend);
};

const parseString = (text: unknown): string => {
    if (!isString(text)) {
        throw new Error('Incorrect or missing field');
    }
    return text;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (text: unknown): string => {
    if (!isString(text) || !isGender(text)) {
        throw new Error('Incorrect or missing field');
    }
    return text;
};



export {toNewPatient};
