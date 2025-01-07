import { Cliente } from './clientes';

export interface Sucursal {
  id: number;
  codSucursal: string | null;
  id_Cliente: number;
  Detalle: string;
  Direccion: string;
  Telefono: string;
  cliente: Cliente;
}
