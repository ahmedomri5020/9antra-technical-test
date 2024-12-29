import { Image } from './Image';
export interface Course {
  idCourse: number;
  nomCourse: string;
  detailsCourse: string;
  prixCourse: number;
  image: Image; // Image object
  imageStr: string; // Image as a base64 string
}
