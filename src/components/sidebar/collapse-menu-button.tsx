import { useState } from 'react';
import { PiDotOutlineFill } from 'react-icons/pi';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Button } from '../ui/button';

import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

import { FaBoxArchive, FaChevronDown, FaMinus } from 'react-icons/fa6';
import { Rutas, SubRutas } from '@/types/rutas';
import { Link } from 'react-router-dom';
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';

interface CollapseMenuButtonProps {
  isOpen: boolean | undefined;
}
export function CollapseMenuButton({
  descripcion,
  path,
  subrutas,
  isOpen,
}: Rutas & CollapseMenuButtonProps) {
  //   const isSubMenuActive = subrutas?.some((submenu: SubRutas) =>
  //     submenu.active === undefined ? submenu.href === pathname : submenu.active
  //   );
  const [isCollapsed, setIsCollapsed] = useState<boolean | undefined>(false);

  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <CollapsibleTrigger
        className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1"
        asChild
      >
        <Button variant={'ghost'} className="w-full justify-start h-10">
          <div className="w-full items-center flex justify-between">
            <div className="flex items-center">
              <span className="mr-4">
                <FaBoxArchive color="hsl(225.9 70.7% 40.2%)" />
              </span>

              <p
                className={cn(
                  'max-w-[150px] truncate',
                  isOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-96 opacity-0'
                )}
              >
                {descripcion}
              </p>
            </div>

            <div
              className={cn(
                'whitespace-nowrap',
                isOpen
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-96 opacity-0'
              )}
            >
              <FaChevronDown
                width={18}
                height={18}
                className="transition-transform duration-200"
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {subrutas?.map(({ descripcion, path }, index) => (
          <Button
            key={index}
            variant={'ghost'}
            className="w-full justify-start h-10 mb-1"
            asChild
          >
            <Link to={path}>
              <span className="mr-4 ml-2">
                <FaMinus
                  width={10}
                  height={10}
                  color={`hsl(239 95% 29%/0.94)`}
                />
              </span>
              <p
                className={cn(
                  'max-w-[170px] truncate',
                  isOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-96 opacity-0'
                )}
              >
                {descripcion}
              </p>
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                // variant={active ? 'secondary' : 'ghost'}
                variant={'ghost'}
                className="w-full justify-start h-10 mb-1"
              >
                <div className="w-full items-center flex justify-between">
                  <div className="flex items-center">
                    <span className={cn(isOpen === false ? '' : 'mr-4')}>
                      <FaBoxArchive color="hsl(225.9 70.7% 40.2%)" />
                    </span>
                    <p
                      className={cn(
                        'max-w-[200px] truncate',
                        isOpen === false ? 'opacity-0' : 'opacity-100'
                      )}
                    >
                      {descripcion}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {descripcion}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {descripcion}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {subrutas?.map(({ path, descripcion }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link
              className={`cursor-pointer
                'bg-secondary'
              }`}
              to={path}
            >
              <p className="max-w-[180px] truncate">{descripcion}</p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
