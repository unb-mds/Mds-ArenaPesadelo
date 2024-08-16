import { Props } from 'react-select';

export interface IOptionType {
  [key: string]: string | number | boolean;
}

export interface IOption {
  label: string;
  value?: string | number | boolean;
}

export interface ISelect extends Props<IOption, false> {
  label: string;
  name: string;
  options: IOption[];
  error?: string;
}
