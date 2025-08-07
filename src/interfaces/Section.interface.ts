import { Part } from './Part.interface';

export interface Section {
  id: number;
  name: string;
  index_name: string;
  Part: Part;
}
