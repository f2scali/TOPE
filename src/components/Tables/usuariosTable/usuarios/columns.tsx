import { Usuario } from '@/types/usuario';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: 'codUsuario',
    header: 'COD Usuario',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },

  {
    accessorKey: 'usuario',
    header: 'Usuario',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
  {
    accessorFn: (row) => row.rol?.descripcion.toUpperCase(),
    header: 'Rol',
    cell: ({ cell }) => <div className="text-left">{`${cell.getValue()}`}</div>,
  },
];
