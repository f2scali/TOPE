import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { Linea } from '@/types/linea';
import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface ColumnsProps {
  setOpenDialog: (value: boolean) => void;
  setSelectedItem: (item: Linea) => void;
}
export const columns = ({
  setOpenDialog,
  setSelectedItem,
}: ColumnsProps): ColumnDef<Linea>[] => [
  {
    accessorKey: 'codLinea',
    header: 'COD Linea',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },

  {
    accessorKey: 'detalle',
    header: 'Detalle',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
  {
    accessorFn: (row) => row.tipoInventario?.Detalle,
    header: 'Inventario',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <div>
          <DataTableRowActions
            row={row}
            actions={[
              {
                label: 'Editar',
                icon: FaEdit,
                color: 'text-blue-500',
                onClick: () => {
                  const lineaData = row.original;
                  navigate(`/linea/editar/${lineaData.id}`, {
                    state: row.original,
                  });
                  console.log('Edit', lineaData);
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
        </div>
      );
    },
  },
];
