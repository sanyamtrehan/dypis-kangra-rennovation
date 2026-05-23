import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface SingleMenuItem {
  name: string;
  icon: IconDefinition;
  action?: () => void;
  routerLink: string | null;
  routerLinkActive: string;
}

export interface MenuItem extends SingleMenuItem {
  subMenu?: SingleMenuItem[];
}

export interface BasicCard {
  name: string;
  text: string;
  image: string;
}

export interface KgActivity {
  btnTitle: string;
  btnBgColor: ColorPalette;
  heading: string;
  text: string;
}

export interface SchoolStat {
  name: string;
  totalNo: number;
  icon: IconDefinition;
  circleColor: ColorPalette;
}

export interface testimonial {
  text: string;
  name: string;
  image: string;
  designation: string;
}

export interface SchoolTeacher {
  image: string;
  designation: string;
  name: string;
  quote: string;
}

export interface AdmissionProcess {
  icon: IconDefinition;
  title: string;
  text: string;
  btnText: string;
  action: (param?: any) => void;
}

export interface Faculty {
  name: string;
  qualification?: string;
  designation: string;
}

export interface FacultyHeaders {
  header: keyof Faculty;
  sortBy: SortByEnum;
}

export enum SortByEnum {
  NONE = 'none',
  ASC = 'asc',
  DESC = 'desc',
}

export enum ColorPalette {
  ORANGE = '#fb6b48',
  BLUE = '#5bc4db',
  LIGHT_BLUE = '#cdeef0',
  DARK_GREEN = '#879f27',
  GREEN = '#43c077',
  YELLOW = '#fac80d',
  PURPLE = '#ba82c5',
  WHITE = '#fff',
  GRAY = '#929292',
  LIGHT_GRAY = '#a0a09f',
  WHITE_GRAY = '#f8f8f8',
  BLACK = '#191919',
  LIGHT_BLACK = '#5b5b5b',
  DARK_BLACK = '#111',
}

export interface Footer {
  detail: string;
  icon: IconDefinition;
}

export class Doc {
  constructor(
    public name: string,
    public document: string,
  ) {}
}
