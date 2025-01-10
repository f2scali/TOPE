import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { UnidadMedida } from '@/types/unidadMed';
import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface ColumnsProps {
  setOpenDialog: (value: boolean) => void;
  setSelectedItem: (item: UnidadMedida) => void;
}
export const columns = ({
  setOpenDialog,
  setSelectedItem,
}: ColumnsProps): ColumnDef<UnidadMedida>[] => [
  {
    accessorKey: 'codUnidadMed',
    header: 'COD Medida',
    cell: ({ cell }) => {
      const value = cell.getValue();
      return <div className="text-left">{`${value ?? 'N/A'}`}</div>;
    },
  },

  {
    accessorKey: 'Detalle',
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
        <DataTableRowActions
          row={row}
          actions={[
            {
              label: 'Editar',
              icon: FaEdit,
              color: 'text-blue-500',
              onClick: () => {
                const unidadMedData = row.original;
                navigate(`/unidad-inventario/editar/${unidadMedData.id}`, {
                  state: unidadMedData,
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
