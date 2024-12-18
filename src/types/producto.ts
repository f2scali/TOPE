export interface Linea {
  id: number;
  codLinea: string;
  detalle: string;
}
export interface TipoInventario {
  id: number;
  codInventario: string;
  detalle: string;
}
export interface UnidadMedida {
  id: number;
  codUnidadMed: string;
  Detalle: string;
}

export interface Criterio {
  id: number;
  codCriterio: string;
  Detalle: string;
}
export interface Producto {
  id: number;
  id_item: string;
  id_ext_item: string;
  id_inventario: number;
  id_linea: number;
  descripcion: string;
  id_referencia: number;
  unimed_inv_1: string;
  id_cricla1: string;
  costo: number;
  estado: number;
  linea: Linea;
  tipoInventario: TipoInventario;
  unidadMed: UnidadMedida;
  criterio: Criterio;
}
