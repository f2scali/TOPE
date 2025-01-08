import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { TipoCliente } from '@/types/tipoCliente';
import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
interface ColumnsProps {
  setOpenDialog: (value: boolean) => void;
  setSelectedItem: (item: TipoCliente) => void;
}
export const columns = ({
  setOpenDialog,
  setSelectedItem,
}: ColumnsProps): ColumnDef<TipoCliente>[] => [
  {
    accessorKey: 'codTipoCliente',
    header: 'COD Tipo',
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
                const tipoCliente = row.original;
                navigate(`/clientes/editarTipo/${tipoCliente.id}`, {
                  state: tipoCliente,
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
