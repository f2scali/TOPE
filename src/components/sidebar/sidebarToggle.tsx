import { FaAngleLeft } from 'react-icons/fa6';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen: () => void;
}
export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20">
      <Button
        className="rounded-md size-8"
        variant="outline"
        size="icon"
        onClick={() => setIsOpen?.()}
      >
        <FaAngleLeft
          className={cn(
            'size-4 transition-transform ease-in-out duration-700',
            isOpen === false ? 'rotate-180' : 'rotate-0'
          )}
        />
      </Button>
    </div>
  );
}
