import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { Vendedor } from '@/types/vendedor';
import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
export const columns: ColumnDef<Vendedor>[] = [
  {
    accessorKey: 'NOMBRE',
    header: 'Nombre',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },

  {
    accessorKey: 'APELLIDO',
    header: 'Apellido',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },

  {
    accessorKey: 'Correo',
    header: 'Correo',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
  {
    accessorKey: 'Telefono',
    header: 'Teléfono',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
  {
    accessorFn: (row) => row.usuario?.usuario,
    header: 'Usuario',
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
                const vendedorData = row.original;
                navigate(`/usuarios/vendedores/editar/${vendedorData.id}`, {
                  state: vendedorData,
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
