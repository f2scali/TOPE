import { TipoInventario } from './producto';

export interface Criterio {
  id: number;
  codCriterio: string;
  Detalle: string;
  tipoInventario: TipoInventario;
}
