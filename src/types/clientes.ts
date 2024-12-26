import { ListaPrecio } from './listaPrecio';
import { TipoCliente } from './tipoCliente';
import { Vendedor } from './vendedor';

export interface PostCliente {
  CODIGO?: string;
  NIT: string;
  Descripcion: string;
  id_Tipo_Cliente: number;
  id_Lista_Precio: number;
  id_Vendedor: number;
}
export interface Cliente {
  id: number;
  NIT: string;
  Descripcion: string;
  id_Tipo_Cliente: number;
  id_Lista_Precio: number;
  id_Vendedor: number;
  tipoCliente: TipoCliente;
  listaPrecios: ListaPrecio;
  vendedor: Vendedor;
}
