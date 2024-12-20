import { TipoInventario } from './producto';

export interface Linea {
  id: number;
  codLinea: string;
  detalle: string;
  tipoInventario: TipoInventario;
}
