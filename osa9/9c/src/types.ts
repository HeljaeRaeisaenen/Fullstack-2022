interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Diagnosis['code'][];
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

export interface OccupationalHealthcareEntry extends BaseEntry {
    employerName: string;
    sickLeave?: SickLeave;
    type: 'OccupationalHealthcare'
}

export interface HospitalEntry extends BaseEntry {
    discharge: Discharge;
    type: 'Hospital'
}

export interface HealthCheckEntry extends BaseEntry {
    healthCheckRating: HealthCheckRating;
    type: 'HealthCheck'
}

export type Entry =
    HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}