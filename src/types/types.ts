export type TLabel = {
  color: string;
  name: string;
};

export type TTask = {
  id: string;
  name: string;
  labelIds: string[];
};

export type TTasks = Record<string, TTask[]>;
export type TLabels = Record<string, TLabel>;

export type TDay = {
  date: string;
  tasks: TTask[];
  holidays?: [];
};

export type TLabelOption = {
  value: string;
  label: string;
  color: string;
};

export type TJsonCalendar = {
  tasks: TTasks;
  labels: TLabels;
};

export type THoliday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: number;
  types: string[];
};

export type THolidays = Record<string, THoliday[]>;
