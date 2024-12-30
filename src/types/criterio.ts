import { Inventario } from './inventario';

export interface Criterio {
  id: number;
  codCriterio: string | null;
  Detalle: string;
  tipoInventario: Inventario;
}
