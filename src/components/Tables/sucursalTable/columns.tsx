import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { Sucursal } from '@/types/sucursal';
import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
export const columns: ColumnDef<Sucursal>[] = [
  {
    accessorKey: 'codSucursal',
    header: 'COD',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
  {
    accessorKey: 'Detalle',
    header: 'Detalle',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue('Detalle')}</div>
    ),
  },
  {
    accessorKey: 'Direccion',
    header: 'Dirección',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue('Direccion')}</div>
    ),
  },
  {
    accessorKey: 'Telefono',
    header: 'Teléfono',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue('Telefono')}</div>
    ),
  },
  {
    accessorFn: (row) => row.cliente?.Descripcion,
    header: 'Cliente',
    cell: ({ cell }) => (
      <div className="text-left">{`${cell.getValue()}` || 'Sin Cliente'}</div>
    ),
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <DataTableRowActions
          row={row}
          actions={[
            {
              label: 'Editar',
              icon: FaEdit,
              color: 'text-blue-500',
              onClick: () => {
                const sucursalData = row.original;

                navigate(`/clientes/sucursal/editar/${sucursalData.id}`, {
                  state: sucursalData,
                });
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
