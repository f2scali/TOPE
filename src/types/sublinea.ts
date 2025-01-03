import { Linea } from './linea';

export interface SubLinea {
  id: number;
  codSublinea: string;
  detalle: string;
  id_linea: number;
  linea: Linea;
}
