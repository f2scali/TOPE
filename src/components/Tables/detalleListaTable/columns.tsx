import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { DetalleLista } from '@/types/detalleLista';
import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
export const columns: ColumnDef<DetalleLista>[] = [
  {
    accessorKey: 'cod_ListaPrecio',
    header: 'COD Lista',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },

  {
    accessorKey: 'PRECIO',
    header: 'Precio',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },

  {
    accessorFn: (row) => row.producto.descripcion,
    header: 'Producto perteneciente',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },

  {
    accessorFn: (row) => row.listaPrecios.DETALLE,
    header: 'Lista Perteneciente',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DataTableRowActions
          row={row}
          actions={[
            {
              label: 'Editar',
              icon: FaEdit,
              color: 'text-blue-500',
              onClick: (rowData) => {
                console.log('Edit', rowData);
              },
            },

            {
              label: 'Borrar',
              icon: FaDeleteLeft,
              color: 'text-red-500',
              onClick: (rowData) => {
                console.log('Borrar', rowData);
              },
            },
          ]}
        />
      );
    },
  },
];
