interface Rol {
  id: number;
  descripcion: string;
}
export interface Usuario {
  id: number;
  codUsuario: string;
  usuario: string;
  id_rol: number;
  rol: Rol;
}
