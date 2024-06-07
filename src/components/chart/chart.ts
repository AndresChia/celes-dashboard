export interface Chart {
  name: string;
  [key: string]: string | number;
}

export interface LineI {
  key: string;
  stroke?: string;
}
