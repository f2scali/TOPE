import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { SubLinea } from '@/types/sublinea';
import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface ColumnsProps {
  setOpenDialog: (value: boolean) => void;
  setSelectedItem: (item: SubLinea) => void;
}
export const columns = ({
  setOpenDialog,
  setSelectedItem,
}: ColumnsProps): ColumnDef<SubLinea>[] => [
  {
    accessorKey: 'codSublinea',
    header: 'COD Linea',
    cell: ({ cell }) => {
      const value = cell.getValue();
      return <div className="text-left">{`${value ?? 'N/A'}`}</div>;
    },
  },

  {
    accessorKey: 'detalle',
    header: 'Detalle',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
  {
    accessorFn: (row) => row?.linea?.detalle,
    header: 'Linea',
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
                const sublineaData = row.original;
                navigate(
                  `/agrupacion-productos/sublinea/editar/${sublineaData.id}`,
                  {
                    state: sublineaData,
                  }
                );
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
