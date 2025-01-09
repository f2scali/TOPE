import { Linea } from './linea';

export interface SubLinea {
  id: number;
  codSublinea: string | null;
  detalle: string;
  id_linea: number;
  linea: Linea;
}
