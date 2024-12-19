import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { Cliente } from '@/types/clientes';
import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
export const columns: ColumnDef<Cliente>[] = [
  {
    accessorKey: 'NIT',
    header: 'NIT',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
  //   {
  //     accessorFn: (row) => row.tipoInventario?.detalle,
  //     header: 'Inventario',
  //     cell: ({ cell }) => (
  //       <div className="text-left">{`${cell.getValue()}` || 'Sin Tipo Inv'}</div>
  //     ),
  //   },
  //   {
  //     accessorFn: (row) => row.linea?.detalle,
  //     header: 'Línea',
  //     cell: ({ cell }) => (
  //       <div className="text-left">{`${cell.getValue()}` || 'Sin Linea'}</div>
  //     ),
  //   },
  {
    accessorKey: 'Descripcion',
    header: 'Descripción',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue('Descripcion')}</div>
    ),
  },
  //   {
  //     accessorFn: (row) => row.unidadMed?.Detalle,
  //     header: 'Unidad Medida',
  //     cell: ({ cell }) => (
  //       <div className="text-left">
  //         {`${cell.getValue()}` || 'Sin Unidad Med'}
  //       </div>
  //     ),
  //   },
  //   {
  //     accessorFn: (row) => row.criterio?.Detalle,
  //     header: 'Cricla',
  //     cell: ({ cell }) => (
  //       <div className="text-left">{`${cell.getValue()}` || 'Sin criterio'}</div>
  //     ),
  //   },
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
