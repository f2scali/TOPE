import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { Producto } from '@/types/producto';
import { ColumnDef } from '@tanstack/react-table';

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
    accessorFn: (row) => row.tipoInventario?.Detalle,
    header: 'Inventario',
    cell: ({ cell }) => (
      <div className="text-left">{`${cell.getValue()}` || 'Sin Tipo Inv'}</div>
    ),
  },
  {
    accessorFn: (row) => row.linea?.detalle,
    header: 'Línea',
    cell: ({ cell }) => (
      <div className="text-left">{`${cell.getValue()}` || 'Sin Linea'}</div>
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
    accessorFn: (row) => row.unidadMed?.Detalle,
    header: 'Unidad Medida',
    cell: ({ cell }) => (
      <div className="text-left">
        {`${cell.getValue()}` || 'Sin Unidad Med'}
      </div>
    ),
  },
  {
    accessorFn: (row) => row.criterio?.Detalle,
    header: 'Cricla',
    cell: ({ cell }) => (
      <div className="text-left">{`${cell.getValue()}` || 'Sin criterio'}</div>
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
