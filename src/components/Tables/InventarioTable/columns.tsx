import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { Inventario } from '@/types/inventario';
import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
export const columns: ColumnDef<Inventario>[] = [
  {
    accessorKey: 'codInventario',
    header: 'COD Inventario',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },

  {
    accessorKey: 'Detalle',
    header: 'Detalle',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
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
                const inventarioData = row.original;
                navigate(`/inventario/editar/${inventarioData.id}`, {
                  state: inventarioData,
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
