import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { Cliente } from '@/types/clientes';
import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface ColumnsProps {
  setOpenDialog: (value: boolean) => void;
  setSelectedItem: (item: Cliente) => void;
}
export const columns = ({
  setOpenDialog,
  setSelectedItem,
}: ColumnsProps): ColumnDef<Cliente>[] => [
  {
    accessorKey: 'NIT',
    header: 'NIT',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
  {
    accessorKey: 'Descripcion',
    header: 'Descripción',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue('Descripcion')}</div>
    ),
  },
  {
    accessorFn: (row) => row.tipoCliente?.Detalle,
    header: 'Tipo de cliente',
    cell: ({ cell }) => (
      <div className="text-left">{`${cell.getValue()}` || 'Sin Tipo Inv'}</div>
    ),
  },
  {
    accessorFn: (row) => row.listaPrecios?.DETALLE,
    header: 'Lista de Precio',
    cell: ({ cell }) => (
      <div className="text-left">{`${cell.getValue()}` || 'Sin Linea'}</div>
    ),
  },
  {
    accessorFn: (row) =>
      `${row.vendedor?.NOMBRE || ''} ${row.vendedor?.APELLIDO || ''}`.trim(),
    header: 'Vendedor',
    cell: ({ cell }) => (
      <div className="text-left">{`${cell.getValue()}` || 'Sin Vendedor'}</div>
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
                const clienteId = row.original.id;

                navigate(`/clientes/editar/${clienteId}`, {
                  state: row.original,
                });
              },
            },

            {
              label: 'Borrar',
              icon: FaDeleteLeft,
              color: 'text-red-500',
              onClick: (rowData) => {
                setOpenDialog(true);
                setSelectedItem(rowData);
              },
            },
          ]}
        />
      );
    },
  },
];
