import { Producto } from '@/types/producto';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from '../core/dataTable/row-actions';
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
export const columns: ColumnDef<Producto>[] = [
  {
    accessorKey: 'id',
    header: 'ID Producto',
    cell: ({ row }) => (
      <div className="text-left">
        {`${row.original.id_item}${
          row.original.id_ext_item ? `-${row.original.id_ext_item}` : ''
        }`}
      </div>
    ),
  },
  {
    accessorKey: 'id_inventario',
    header: 'Inventario',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue('id_inventario')}</div>
    ),
  },
  {
    accessorKey: 'id_linea',
    header: 'Línea',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue('id_linea')}</div>
    ),
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripción',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue('descripcion')}</div>
    ),
  },
  {
    accessorKey: 'id_referencia',
    header: 'ID Referencia',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue('id_referencia')}</div>
    ),
  },
  {
    accessorKey: 'unimed_inv_1',
    header: 'Unidad Medida',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue('unimed_inv_1')}</div>
    ),
  },
  {
    accessorKey: 'id_cricla1',
    header: 'Cricla',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue('id_cricla1')}</div>
    ),
  },
  {
    accessorKey: 'costo',
    header: 'Costo',
    cell: ({ row }) => {
      const cost = parseFloat(row.getValue('costo'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(cost);

      return <div className="text-left font-medium">{formatted}</div>;
    },
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
