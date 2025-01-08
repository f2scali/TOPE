import { DataTableRowActions } from '@/components/core/dataTable/row-actions';
import { DetalleLista } from '@/types/detalleLista';
import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface ColumnsProps {
  setOpenDialog: (open: boolean) => void;
  setSelectedItem: (item: DetalleLista) => void;
}
export const columns = ({
  setOpenDialog,
  setSelectedItem,
}: ColumnsProps): ColumnDef<DetalleLista>[] => [
  {
    accessorKey: 'cod_ListaPrecio',
    header: 'COD',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },

  {
    accessorKey: 'PRECIO',
    header: 'Precio',
    cell: ({ row }) => {
      const precio = parseFloat(row.getValue('PRECIO'));
      const formatted = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        useGrouping: true,
        currency: 'COP',
      }).format(precio);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },

  {
    accessorFn: (row) => row.producto.descripcion,
    header: 'Producto perteneciente',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },

  {
    accessorFn: (row) => row.listaPrecios.DETALLE,
    header: 'Lista Perteneciente',
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
                const detalleListaData = row.original;
                navigate(
                  `/lista-precios/det-lista-precio/editar/${detalleListaData.id}`,
                  {
                    state: detalleListaData,
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
