import { Usuario } from './usuario';

export interface Vendedor {
  id: number;
  idUsuario: number;
  NOMBRE: string;
  APELLIDO: string;
  Correo: string;
  Telefono: string;
  usuario: Usuario;
}
