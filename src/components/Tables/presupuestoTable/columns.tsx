import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { Ppto } from '@/types/ppto';
import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface ColumnsProps {
  setOpenDialog: (value: boolean) => void;
  setSelectedItem: (item: Ppto) => void;
}
export const columns = ({
  setOpenDialog,
  setSelectedItem,
}: ColumnsProps): ColumnDef<Ppto>[] => [
  {
    accessorKey: 'Año',
    header: 'Año',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
  {
    accessorKey: 'Mes',
    header: 'Mes',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
  {
    accessorKey: 'Cuota',
    header: 'Cuota',
    cell: ({ row }) => {
      const cuota = parseFloat(row.getValue('Cuota'));
      const formatted = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        useGrouping: true,
        currency: 'COP',
      }).format(cuota);

      return <div className="text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: 'Ventas',
    header: 'Ventas',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
  {
    accessorFn: (row) => `${row.vendedor?.NOMBRE} ${row.vendedor?.APELLIDO}`,
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
                const pptoData = row.original;

                navigate(`/usuarios/Presupuestos/editar/${pptoData.id}`, {
                  state: pptoData,
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
