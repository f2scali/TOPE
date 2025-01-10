import { SubLinea } from './sublinea';

export interface DetalleLinea {
  codDetLinea: string | null;
  id: number;
  detalle: string;
  id_sublinea: number;
  sublinea: SubLinea;
}
