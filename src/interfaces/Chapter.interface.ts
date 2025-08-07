import { Section } from './Section.interface';

export interface Chapter {
  id: number;
  name: string;
  index_name: string;
  Section: Section;
}
