export interface MenuType {
  id: number;
  descripcion: string;
  path: string;
  icon: string;
  iconColor?: string;
  subrutas: any[];
}
export const adminMenu: MenuType[] = [
  {
    id: 19,
    descripcion: 'Usuarios',
    path: '/usuarios',
    icon: 'UserIcon',
    iconColor: '#cbbb52',
    subrutas: [
      {
        id: 7,
        descripcion: 'Usuarios',
        path: '/usuarios/usuarios',
      },
      {
        id: 8,
        descripcion: 'Vendedores',
        path: '/usuarios/vendedores',
      },
      {
        id: 12,
        descripcion: 'Presupuesto',
        path: '/usuarios/presupuesto',
      },
    ],
  },
  {
    id: 21,
    descripcion: 'Administracion items',
    path: '/administracion-items',
    icon: 'AdminItemsIcon',
    iconColor: '#c43b3b',
    subrutas: [
      {
        id: 13,
        descripcion: 'Tipo inventario',
        path: '/administracion-items/inventario',
      },
      {
        id: 14,
        descripcion: 'Linea',
        path: '/administracion-items/linea',
      },
      {
        id: 15,
        descripcion: 'Sublinea',
        path: '/administracion-items/sublinea',
      },
      {
        id: 16,
        descripcion: 'Detalle de linea',
        path: '/administracion-items/det-linea',
      },
      {
        id: 17,
        descripcion: 'Criterios',
        path: '/administracion-items/criterios',
      },
      {
        id: 18,
        descripcion: 'Unidades de medida',
        path: '/administracion-items/unidades-medida',
      },
      {
        id: 19,
        descripcion: 'Productos',
        path: '/administracion-items/productos',
      },
    ],
  },
  {
    id: 17,
    descripcion: 'Lista de Precios',
    path: '/lista-precios',
    icon: 'ListaPreciosIcon',
    subrutas: [
      {
        id: 9,
        descripcion: 'Lista de Precios',
        path: '/lista-precios/lista',
      },
      {
        id: 4,
        descripcion: 'Detalle de Lista',
        path: '/lista-precios/det-lista-precio',
      },
    ],
  },

  {
    id: 18,
    descripcion: 'Clientes',
    path: '/clientes',
    icon: 'ClientesIcon',
    iconColor: '#2c9638',
    subrutas: [
      {
        id: 5,
        descripcion: 'Tipo Cliente',
        path: '/clientes/tipo-cliente',
      },
      {
        id: 6,
        descripcion: 'Clientes',
        path: '/clientes/det-clientes',
      },
      {
        id: 11,
        descripcion: 'Sucursales',
        path: '/clientes/Sucursales',
      },
    ],
  },
];

export const vendedorMenu = []; //aqui rutas de vendedor
