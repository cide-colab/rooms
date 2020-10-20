import {Identity} from './identity';

export interface AboModel {
  title: string;
  start: string;
  end: string;
  contingent: number;
  unlimited_end: boolean;
  unlimited_contingent: boolean;
  description: string;
}

export interface Abo extends AboModel, Identity {}
export interface RichAbo extends AboModel, Identity {}
