export interface MenuType {
  id: number;
  descripcion: string;
  path: string;
  icon: string;
  subrutas: any[];
}
export const adminMenu: MenuType[] = [
  {
    id: 11,
    descripcion: 'Inventario',
    path: '/inventario',
    icon: 'MdInventory',
    subrutas: [],
  },
  {
    id: 12,
    descripcion: 'Agrupación de Productos',
    path: '/agrupacion-productos',
    icon: 'FaBox',
    subrutas: [
      {
        id: 1,
        descripcion: 'Línea',
        path: '/agrupacion-productos/linea',
      },
      {
        id: 2,
        descripcion: 'Sublínea',
        path: '/agrupacion-productos/sublinea',
      },
      {
        id: 3,
        descripcion: 'Detalle Línea',
        path: '/agrupacion-productos/det-linea',
      },
    ],
  },
  {
    id: 14,
    descripcion: 'Criterios',
    path: '/criterio',
    icon: 'FaList',
    subrutas: [],
  },
  {
    id: 15,
    descripcion: 'Unidades de medida',
    path: '/unidad-inventario',
    icon: 'FaBalanceScale',
    subrutas: [],
  },
  {
    id: 17,
    descripcion: 'Lista de Precios',
    path: '/lista-precios',
    icon: 'FaListAlt',
    subrutas: [
      {
        id: 4,
        descripcion: 'Detalle de Lista',
        path: '/lista-precios/det-lista-precio',
      },
      {
        id: 9,
        descripcion: 'Lista de Precios',
        path: '/lista-precios/lista',
      },
    ],
  },

  {
    id: 18,
    descripcion: 'Clientes',
    path: '/clientes',
    icon: 'FaUsers',
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
  {
    id: 19,
    descripcion: 'Usuarios',
    path: '/usuarios',
    icon: 'MdGroup',
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
];

export const vendedorMenu = []; //aqui rutas de vendedor
