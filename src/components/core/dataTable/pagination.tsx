import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FaAnglesLeft,
  FaAnglesRight,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa6';

interface DataTablePaginationProps {
  page: number;
  limit: number;
  handleLimitChange: (limit: number) => void;
  handlePageChange: (page: number) => void;
}

export function DataTablePagination({
  page,
  limit,
  handleLimitChange,
  handlePageChange,
}: DataTablePaginationProps) {
  console.log('page', page);
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">{'Filas por pagina'}</p>
        <Select
          value={`${limit}`}
          onValueChange={(value) => handleLimitChange?.(parseInt(value))}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => handlePageChange(1)}
          //   disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">{'Go to first page'}</span>
          <FaAnglesLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(page - 1)}
          //   disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">{'Go to previous page'}</span>
          <FaChevronLeft className="h-4 w-4" />
        </Button>
        <p>{page}</p>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(page + 1)}
          //   disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">{'Go to next page'}</span>
          <FaChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          //   onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          //   disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">{'Go to last page'}</span>
          <FaAnglesRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
