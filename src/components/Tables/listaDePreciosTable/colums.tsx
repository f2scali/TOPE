import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { ListaPrecio } from '@/types/listaPrecio';
import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
export const columns: ColumnDef<ListaPrecio>[] = [
  {
    accessorKey: 'codLista',
    header: 'COD Lista',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },

  {
    accessorKey: 'DETALLE',
    header: 'Precio',
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
                const listaPrecioData = row.original;
                navigate(`/lista-precios/editar/${listaPrecioData.id}`, {
                  state: listaPrecioData,
                });
                console.log('Edit');
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
