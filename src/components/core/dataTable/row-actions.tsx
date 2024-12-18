import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { FaEllipsis } from 'react-icons/fa6';
import { IconType } from 'react-icons/lib';

interface ActionConfig {
  label: string;
  icon: IconType;
  color?: string;
  onClick: (rowData: any) => void;
}
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  actions?: ActionConfig[];
}

export function DataTableRowActions<TData>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <FaEllipsis className="h-4 w-4" />
          <span className="sr-only">{'Open menu'}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {!actions && (
          <DropdownMenuItem>
            <p>NO ACTIONS</p>
          </DropdownMenuItem>
        )}
        {actions?.map((action) => (
          <DropdownMenuItem
            key={action.label}
            onClick={() => action.onClick(row.original)}
          >
            <Button
              variant="ghost"
              size="sm"
              className="justify-start w-full"
              asChild
            >
              <span>
                <action.icon className={`w-4 h-4 ${action.color}`} />
                <span className="ml-2">{action.label}</span>
              </span>
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
