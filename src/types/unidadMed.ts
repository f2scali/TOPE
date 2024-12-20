import { TipoInventario } from './producto';

export interface UnidadMedida {
  id: number;
  codUnidadMed: string;
  Detalle: string;
  tipoInventario: TipoInventario;
}
