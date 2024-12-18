import { cn } from '@/lib/utils';
// import { CollapseMenuButton } from './collapse-menu-button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { Link } from 'react-router-dom';
import { Rutas } from '@/types/rutas';
import { FaBoxArchive } from 'react-icons/fa6';
import { CollapseMenuButton } from './collapse-menu-button';

interface MenuProps {
  isOpen: boolean | undefined;
}
interface MenusRespose {
  rutas: Rutas[];
}
export function Menu({ isOpen }: MenuProps) {
  //   const pathname = usePathname();
  const { rutas, loading, error } = useSelector(
    (state: RootState) => state.rutas
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <nav className="mt-8 h-full w-full">
      <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
        {rutas?.map(({ id, descripcion, path, subrutas }) =>
          subrutas.length === 0 ? (
            <li className="w-full" key={id}>
              <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-10 mb-1"
                      asChild
                    >
                      <Link to={path}>
                        <span className={cn(isOpen === false ? '' : 'mr-4')}>
                          <FaBoxArchive color="hsl(225.9 70.7% 40.2%)" />
                        </span>

                        <p
                          className={cn(
                            'max-w-[200px] truncate',
                            isOpen === false
                              ? 'translate-x-96 opacity-0'
                              : 'translate-x-0 opacity-100'
                          )}
                        >
                          {descripcion}
                        </p>
                      </Link>
                    </Button>
                  </TooltipTrigger>

                  {isOpen === false && (
                    <TooltipContent side="right">{descripcion}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ) : (
            <div className="w-full" key={id}>
              <CollapseMenuButton
                id={id}
                descripcion={descripcion}
                path={path}
                subrutas={subrutas}
                isOpen={isOpen}
              />
            </div>
          )
        )}
      </ul>
    </nav>
  );
}
